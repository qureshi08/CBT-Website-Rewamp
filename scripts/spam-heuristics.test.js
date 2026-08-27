/**
 * Regression suite for the anti-spam heuristics in src/lib/security/spam.ts.
 * See docs/SECURITY_PLAN.md finding 3.
 *
 *     npm run test:spam
 *
 * The project has no test runner yet (blocked on finding 8 re-enabling type
 * checking), so this is a plain node script: the npm script transpiles spam.ts
 * to .tmp/spam-test/ first, then runs this against it. Exits non-zero on failure.
 *
 * The "legitimate submissions" block is the important half. Every case there
 * must score 0 — a false positive costs a real lead their notification email,
 * which is worse than letting a spam message through. Three of those cases were
 * genuine bugs found by writing this suite: all-caps acronym companies, accented
 * names, and ordinary two-word names.
 */

const { evaluateSubmission } = require("../.tmp/spam-test/spam");

const OLD = Date.now() - 30_000; // a plausible 30-second fill

let pass = 0, fail = 0;
function check(label, input, expectSpam) {
    const v = evaluateSubmission(input);
    const ok = v.isSpam === expectSpam;
    ok ? pass++ : fail++;
    console.log(
        `${ok ? "PASS" : "FAIL"}  ${label}\n      spam=${v.isSpam} score=${v.score} :: ${v.reasons.join("; ") || "no signals"}`
    );
}

console.log("=== The actual spam submission from SECURITY_PLAN.md ===");
check("real spam sample", {
    renderedAt: OLD,
    identityFields: { name: "ADOMqGKwpySrPTJeJNRRHfw", company: "WtrMEdrqGjaianJxvBxjeS" },
    message: "cMsaNGiWFPKHVHOAe",
}, true);

console.log("\n=== Bot behaviours (must flag) ===");
check("honeypot filled", {
    honeypot: "http://spam.example",
    renderedAt: OLD,
    identityFields: { name: "Jane Smith", company: "Acme Ltd" },
    message: "Hello, we would like a quote for Power BI work please.",
}, true);

check("submitted in 400ms", {
    renderedAt: Date.now() - 400,
    identityFields: { name: "Jane Smith", company: "Acme Ltd" },
    message: "Hello, we would like a quote for Power BI work please.",
}, true);

check("link farm (4 links)", {
    renderedAt: OLD,
    identityFields: { name: "Jane Smith", company: "Acme Ltd" },
    message: "visit https://a.example and https://b.example and https://c.example and https://d.example",
}, true);

check("anchor injection", {
    renderedAt: OLD,
    identityFields: { name: "Jane Smith", company: "Acme Ltd" },
    message: 'Please see <a href="https://evil.example">View full enquiry</a> for the details.',
}, true);

check("keyboard-mash name only", {
    renderedAt: OLD,
    identityFields: { name: "XqvBmrtKlpwSdfghJk", company: "Acme Ltd" },
    message: "Hello, we would like a quote for Power BI work please.",
}, true);

check("no timestamp + generated content", {
    identityFields: { name: "ADOMqGKwpySrPTJeJNRRHfw", company: "Acme Ltd" },
    message: "Hello there, please get in touch about our offer.",
}, true);

console.log("\n=== Legitimate submissions (must NOT flag) ===");
const legit = [
    ["plain enquiry", "Jane Smith", "Acme Consulting", "Hi, we're looking for help with our Power BI reporting. Could we arrange a call next week?"],
    ["McDonald + short co", "Ross McDonald", "MTC", "We need IFRS 9 ECL support for a mid-size lender."],
    ["Polish surname", "Anna Brzezinski", "Strzelecki Group", "Interested in your cloud migration services for our retail estate."],
    ["long transliteration", "Muhammad Anas Qureshi", "Convergent Business Technologies", "Following up on our conversation about the data platform build."],
    ["all-caps acronyms", "David Chen", "NCTS HOLDINGS PLC", "Please send pricing for the ECL calculator."],
    ["one-word message", "Sarah Ng", "Nguyen & Co", "Pricing?"],
    ["accents + Rhythms", "Zoe Muller-Schmidt", "Rhythms Ltd", "We would like a demo of the custom visuals suite."],
    ["diacritics preserved", "Zoë Müller-Schmidt", "Ångström Analytiks", "We would like a demo of the custom visuals suite."],
    ["one link, real text", "Tom Reilly", "Reilly Retail", "Our site is https://reilly.example - we need analytics on top of it."],
    ["two links", "Priya Raghunathan", "Raghunathan Advisory", "See https://ra.example and our deck at https://ra.example/deck for context."],
    ["CamelCase brand", "Ken Ito", "PricewaterhouseCoopers", "Requesting a conversation about IFRS 9 tooling for a client."],
    ["Dutch/German long word", "Piet van der Berg", "Bedrijfsadministratie BV", "Graag ontvangen wij informatie over uw clouddiensten en tarieven."],
    ["all-caps shouty message", "Mark Ellis", "Ellis Group", "WE NEED HELP WITH OUR AZURE MIGRATION URGENTLY PLEASE CALL US."],
    ["short everything", "Li Wu", "AB", "Hi"],
];
for (const [label, name, company, message] of legit) {
    check(label, { renderedAt: OLD, identityFields: { name, company }, message }, false);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);

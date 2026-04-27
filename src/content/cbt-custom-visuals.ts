export type Visual = {
    slug: string;
    num: string;
    name: string;
    pitch: string;
    featuresShort: string[];
    description: string[];
    featuresFull: string[];
    upcoming: string[];
    /* TODO: AppSource URL — replace "#" once available */
    appSourceUrl: string;
    /* TODO: YouTube tutorial URL — replace null once available */
    tutorialUrl: string | null;
    /* TODO: replace null with "/cbt-custom-visuals/<slug>.png" once screenshot lands */
    previewSrc: string | null;
};

export const VISUALS: Visual[] = [
    {
        slug: "dual-axis-bar-column-chart",
        num: "01",
        name: "Dual Axis Bar & Column Chart",
        pitch: "Plot two measures on independent scales without dropping in a separate combo chart.",
        featuresShort: [
            "Independent left & right axes",
            "Small multiples + conditional colours",
            "Native cross-filtering & drill-down",
        ],
        description: [
            "Dual Axis Bar & Column Chart lets you plot two measures with different scales side by side on independent axes. Switch between horizontal bar and vertical column orientations with a single toggle. Ideal for comparing values like Revenue vs Units Sold, Sales vs Quantity, or Budget vs Actual across categories.",
            "The visual supports small multiples for trellis layouts, conditional color formatting with rules and field values, bar patterns for accessibility, overlapping and lipstick bar layouts via bar offset, and dual reference lines. Full Power BI interactivity includes cross-filtering, drill-down, drill-through, report page tooltips, and context menus working natively.",
            "All formatting controls use Power BI’s native formatting pane with nested groups, Font Control composites for font family, size, bold, italic, and underline, display units, decimal places, and color pickers. Each axis, legend, bar series, data label, and reference line can be configured independently.",
        ],
        featuresFull: [
            "Dual independent axes with horizontal (bar) and vertical (column) orientation",
            "Small multiples, conditional colors, bar patterns, and overlapping bar layouts",
            "Cross-filtering, drill-down, drill-through, and report page tooltips",
            "Data labels, dual reference lines, and advanced sorting",
            "Native formatting pane with per-axis font, color, display units, and decimal places",
            "Legend with separate title and values controls, 6 position options",
        ],
        upcoming: [
            "Error Bars",
            "Advanced Multilevel Sorting",
            "Axis Scales e.g. Log, Linear, Exponential",
        ],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.cbt_dual_axis_bar_and_column_chart?tab=Overview",
        tutorialUrl: "https://www.youtube.com/watch?v=RqJGw6cajgI",
        previewSrc: "/cbt-custom-visuals/dual-axis-bar-column-chart.png",
    },
    {
        slug: "hierarchical-kpi-cards-tree",
        num: "02",
        name: "Hierarchical KPI Cards Tree",
        pitch: "Up to four KPIs per card across two hierarchy axes, with DAX-driven status colours.",
        featuresShort: [
            "Two-axis hierarchy, multi-level drill",
            "Up to 4 measures per card",
            "DAX-driven traffic-light status",
        ],
        description: [
            "Hierarchical KPI Cards displays your key performance indicators in an interactive, expandable tree layout that supports two independent hierarchy axes simultaneously.",
            "Add fields to Hierarchy 1 (Horizontal) to expand cards to the right — for example, by Region or Department. Add fields to Hierarchy 2 (Vertical) to expand cards downward — for example, by Category and Product. Use one axis or both together for matrix-style analysis across two dimensions.",
            "Each card displays up to 4 KPI measures side by side: revenue, target percentage, year-over-year growth, status text, or any DAX measure you choose. Numeric values aggregate correctly on parent nodes using Power BI’s native subtotal engine, and percentage or ratio measures use DAX-evaluated totals rather than simple averages. String measures such as status text also display correctly at every aggregation level.",
            "The colored status bar at the top of each card can be driven by a DAX measure returning hex color codes, enabling traffic-light indicators, threshold-based coloring, or any custom business logic — evaluated independently at every node in the tree.",
            "Format each KPI slot independently with its own font, size, color, display units, and decimal places, or apply a single global style to all values. Customize card dimensions, gaps, title formatting, label formatting, background colors, and border colors from the standard Power BI format pane.",
            "Navigate large trees with Ctrl+scroll zoom, click-drag panning, fit-to-page, and a built-in zoom toolbar.",
        ],
        featuresFull: [
            "Up to 4 KPI measures displayed per card",
            "Bi-directional tree layout with horizontal and vertical hierarchy axes",
            "DAX-driven status bar color with hex code support",
            "Per-slot value formatting: independent font, size, color, display units, and decimal places for each KPI",
            "Correct aggregation on parent nodes including ratios, percentages, and string measures",
            "Multi-level drill-down on both axes with expand/collapse controls",
            "Ctrl+scroll zoom, click-drag pan, fit-to-page, and zoom toolbar",
            "Cross-filtering with single-click card selection",
            "Native Power BI tooltips with canvas tooltip support",
            "Customizable card size, gaps, fonts, colors, and alignment from the format pane",
        ],
        upcoming: [
            "Conditional Formatting",
            "Color Coded Indicators for Values with Threshold",
            "Reference Values",
        ],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.cbt_hierarchical_kpi_cards_tree_basic?tab=Overview",
        tutorialUrl: "https://www.youtube.com/watch?v=fMjR2sA9ZiQ",
        previewSrc: "/cbt-custom-visuals/hierarchical-kpi-cards-tree.png",
    },
    {
        slug: "multi-kpi-decomposition-tree",
        num: "03",
        name: "Multi KPI Decomposition Tree",
        pitch: "Decompose up to five measures per node, with stacked bars on every branch.",
        featuresShort: [
            "Up to 5 measures per node",
            "Stacked bars at each level",
            "Expand / collapse hierarchies in place",
        ],
        description: [
            "The Multi KPI Decomp Tree is a perfect way to visualize hierarchical data if you have multiple KPIs for each node. The visual currently needs the data in tabular form with the hierarchy flattened out. All the levels (depth) of the visual needs to be flattened out into separate columns and so do the associated KPIs. The sample.pbix on the Microsoft AppSource contains the format of the data to use with the visual.",
        ],
        featuresFull: [
            "Stacked Bar Chart option within nodes",
            "Up to 5 KPIs within nodes",
            "Multiple Formatting Options for the visual",
            "Cross Filtering",
            "Zooming and Panning",
        ],
        upcoming: [
            "Search functionality",
            "Images on nodes",
            "Simple view on zooming out",
        ],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/power-bi-visuals/convergentbusinesstechnologies1681574339335.cbt_mutikpi_decomtree_v01?tab=overview",
        tutorialUrl: null,
        previewSrc: "/cbt-custom-visuals/multi-kpi-decomposition-tree.png",
    },
    {
        slug: "arabic-matrix-table",
        num: "04",
        name: "Arabic Matrix Table",
        pitch: "Right-to-left matrix with Arabic labels, hierarchical rows, subtotals and grand totals.",
        featuresShort: [
            "Native RTL layout & numerals",
            "Multi-level row & column hierarchies",
            "Subtotals + grand totals",
        ],
        description: [
            "The visual enables clear comparison of hierarchical data across rows and columns while fully supporting Arabic layouts, number units, and labeling. It integrates seamlessly with Power BI, offering subtotals, grand totals, cross-filtering, drill-down, tooltips, and flexible customization — making it ideal for financial, operational, and KPI analysis in Arabic dashboards.",
        ],
        featuresFull: [
            "Right-to-Left Arrangement & Aggregation",
            "Arabic Data Labels & Number Units",
            "Row & Column Hierarchies with Drill-Down",
            "Subtotals & Grand Totals",
            "Cross Filtration",
            "Tooltips",
            "Customization Settings",
        ],
        upcoming: ["Conditional Formatting"],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.arabic_matrix_table?tab=Overview",
        tutorialUrl: "https://www.youtube.com/watch?v=TCukldoSK7I",
        previewSrc: "/cbt-custom-visuals/arabic-matrix-table.png",
    },
    {
        slug: "arabic-stacked-bar-chart",
        num: "05",
        name: "Arabic Stacked Bar Chart",
        pitch: "RTL-native stacked bars with Arabic number units, small multiples and cross-filtering.",
        featuresShort: [
            "RTL axis & data labels",
            "Arabic number units",
            "Small multiples + cross-filtering",
        ],
        description: [
            "The visual integrates seamlessly with Power BI, offering tooltips, cross-filtering, and flexible customization, making it ideal for financial, operational, and KPI analysis in Arabic dashboards. The sample.pbix on the Microsoft AppSource contains the format of the data to use with the visual.",
        ],
        featuresFull: [
            "Right to Left Arrangement & Aggregation",
            "Data Labels & Number Units in Arabic",
            "Optional Legends in Arabic",
            "Small Multiples",
            "Cross Filtration",
            "Tooltips",
            "Customization settings",
        ],
        upcoming: ["Drilldown into subcategories"],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.arabic_stacked_bar_chart?tab=Overview",
        tutorialUrl: "https://www.youtube.com/watch?v=5vBZt-VxP5c",
        previewSrc: "/cbt-custom-visuals/arabic-stacked-bar-chart.png",
    },
    {
        slug: "arabic-stacked-column-chart",
        num: "06",
        name: "Arabic Stacked Column Chart",
        pitch: "RTL-native stacked columns matched to the Arabic Bar visual for consistent dashboards.",
        featuresShort: [
            "RTL axis & data labels",
            "Visual parity with the Bar variant",
            "Small multiples + cross-filtering",
        ],
        description: [
            "The visual integrates seamlessly with Power BI, offering tooltips, cross-filtering, and flexible customization, making it ideal for financial, operational, and KPI analysis in Arabic dashboards. The sample.pbix on the Microsoft AppSource contains the format of the data to use with the visual.",
        ],
        featuresFull: [
            "Right to Left Arrangement & Aggregation",
            "Data Labels & Number Units in Arabic",
            "Optional Legends in Arabic",
            "Small Multiples",
            "Cross Filtration",
            "Tooltips",
            "Customization settings",
        ],
        upcoming: ["Drilldown into subcategories"],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.cbt_arabic_stacked_column_chart?tab=Overview",
        tutorialUrl: "https://www.youtube.com/watch?v=G77leg-i5NU",
        previewSrc: "/cbt-custom-visuals/arabic-stacked-column-chart.png",
    },
    {
        slug: "arabic-waterfall-chart",
        num: "07",
        name: "Arabic Waterfall Chart",
        pitch: "Sequential value walk for Arabic dashboards — variance, build-up and bridge analyses.",
        featuresShort: [
            "RTL value walk",
            "Custom positive / negative / total colours",
            "Tooltip & cross-filter support",
        ],
        description: [
            "Waterfall Chart is a custom Power BI visual designed specifically for Arabic and Right-to-Left (RTL) reporting. It enables clear analysis of sequential value changes while fully supporting Arabic layouts, number units, and labeling.",
            "The visual integrates seamlessly with Power BI, offering tooltips, cross-filtering, and flexible customization, making it ideal for financial, operational, and KPI analysis in Arabic dashboards. The sample.pbix on the Microsoft AppSource contains the format of the data to use with the visual.",
        ],
        featuresFull: [
            "Right to Left Arrangement & Aggregation",
            "Data Labels & Number Units in Arabic",
            "Optional Legends in Arabic",
            "Cross Filtration",
            "Tooltips",
            "Customization settings",
        ],
        upcoming: ["Drilldown into subcategories", "Adding initial offset"],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.cbt_arabic_eaterfall_chart?tab=Overview",
        tutorialUrl: "https://youtu.be/BGHl9nKVOXw?si=GSaeN-L1mxt5nFMl",
        previewSrc: "/cbt-custom-visuals/arabic-waterfall-chart.png",
    },
];

export function getVisualBySlug(slug: string): Visual | undefined {
    return VISUALS.find((v) => v.slug === slug);
}

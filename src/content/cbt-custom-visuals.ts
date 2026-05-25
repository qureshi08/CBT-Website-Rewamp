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
        name: "Dual Hierarchy Decomposition Tree",
        pitch: "Up to four KPIs per card across two hierarchy axes, with DAX-driven status colours.",
        featuresShort: [
            "Two-axis hierarchy, multi-level drill",
            "Up to 4 measures per card",
            "DAX-driven traffic-light status",
        ],
        description: [
            "Dual Hierarchy Decomposition Tree displays your key performance indicators in an interactive, expandable tree layout that supports two independent hierarchy axes simultaneously.",
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
    {
        slug: "dumbbell-chart",
        num: "08",
        name: "Dumbbell Chart",
        pitch: "Two markers per category on a shared scale, connected by a line that makes the gap immediately visible.",
        featuresShort: [
            "Two markers + connecting gap line per category",
            "Currency / % aware labels with directional triangles",
            "Conditional colours, reference bands & small multiples",
        ],
        description: [
            "Business analysts often need to highlight the variance between two related values across categories — the gender pay gap across departments, revenue with and without incentives, or pricing before and after discount. Standard bar and line charts struggle to bring out this picture clearly when both values share an axis. Dumbbell Chart places two markers per category on a shared scale, connected by a line that makes the gap immediately visible — turning raw numbers into an intuitive story of change.",
            "The visual recognises currency and percentage formats directly from your data model, so axis and data labels display the correct symbols without manual configuration. Change labels show the difference between the two values as an absolute number, a percentage, or both — with optional directional triangle indicators that instantly communicate whether the movement is positive or negative.",
            "Conditional color formatting highlights categories that meet specific thresholds independently for each marker series, using numeric rules or field-value mapping. Unlimited reference bands mark target zones or acceptable ranges behind the data, and four marker shapes with full styling control ensure accessibility and brand alignment. Small multiples split the chart into a trellis grid for side-by-side comparison across segments, with orientation-aware axis coupling and range matching. Full Power BI interactivity is built in — cross-filtering, drill-down, drill-through, report page tooltips and context menus all work natively.",
        ],
        featuresFull: [
            "Two markers per category on a shared scale, joined by a gap-revealing line",
            "Currency and percentage format detection directly from the data model",
            "Change labels: absolute, percentage, or both — with directional triangle indicators",
            "Per-series conditional color formatting via numeric rules or field-value mapping",
            "Unlimited reference bands for target zones and acceptable ranges",
            "Four marker shapes with full styling control",
            "Small multiples with orientation-aware axis coupling and range matching",
            "Cross-filtering, drill-down, drill-through, report-page tooltips, context menus",
        ],
        upcoming: [],
        appSourceUrl:
            "https://marketplace.microsoft.com/en-us/product/convergentbusinesstechnologies1681574339335.cbt_dumbbell_plot?tab=Overview",
        tutorialUrl: "https://www.youtube.com/watch?v=yHVr0TildU0",
        previewSrc: "/cbt-custom-visuals/dumbbell-chart.png",
    },
    {
        slug: "counts-plot",
        num: "09",
        name: "Counts Plot",
        pitch: "Visualise data distribution with dots scaled by frequency across category lanes.",
        featuresShort: [
            "Dots scaled to frequency with auto or manual binning",
            "Category swim lanes for side-by-side comparison",
            "Conditional colours, reference bands & small multiples",
        ],
        description: [
            "Analysts working with survey scores, quality metrics, or performance ratings often need to see how values distribute across categories — not just averages, but where the data clusters and where outliers sit. Standard bar charts collapse this detail into single aggregates, hiding the shape of the underlying data. Counts Plot solves this by placing dots along a value axis within category lanes, scaling each dot proportionally to the number of observations at that position. Larger circles mean more data points, making frequency patterns immediately visible.",
            "The visual automatically bins nearby values so overlapping data points merge into a single scaled dot rather than stacking invisibly. Users can fine-tune the bin width or leave it on auto for intelligent defaults. A pre-aggregated Count field is also supported for datasets that arrive already summarised.",
            "Currency and percentage formats are detected automatically from the data model. Conditional color formatting with numeric rules or field-value mapping highlights thresholds across the distribution. Unlimited reference bands mark target zones, gridlines, reference lines, and a configurable axis range provide full analytical control. Small multiples split the chart into a trellis grid for side-by-side distribution comparison across segments. Cross-filtering, drill-down, drill-through, report page tooltips, and context menus all work natively.",
        ],
        featuresFull: [
            "Dots scaled proportionally to data frequency with automatic or manual binning",
            "Category swim lanes for side-by-side distribution comparison across groups",
            "Optional Count field for pre-aggregated datasets or auto-count from row-level data",
            "Currency and percentage formatting detected automatically from the data model",
            "Conditional color formatting with numeric rules or field-value mapping",
            "Configurable axis range with minimum and maximum controls",
            "Unlimited reference bands with color, opacity, labels, and font formatting",
            "Small multiples with axis coupling and range matching",
            "Cross-filtering, drill-down, drill-through, report page tooltips, and context menus",
        ],
        upcoming: [],
        /* TODO: replace "#" with the Microsoft AppSource product URL once published */
        appSourceUrl: "#",
        tutorialUrl: null,
        previewSrc: "/cbt-custom-visuals/counts-plot.png",
    },
    {
        slug: "jitter-plot",
        num: "10",
        name: "Jitter Plot",
        pitch: "Show every data point with jitter or beeswarm layout for distribution analysis.",
        featuresShort: [
            "Every observation as an individual dot per lane",
            "Jitter and beeswarm layout modes",
            "Conditional colours, reference bands & small multiples",
        ],
        description: [
            "When analysts need to see every individual data point rather than aggregated summaries, standard charts fall short. Box plots show quartiles but hide the raw data. Bar charts reduce distributions to single values. Jitter Plot reveals the full picture by drawing every observation as a dot, spread within category lanes using randomized jitter or tight beeswarm packing so that overlapping points become visible instead of hidden.",
            "Two layout modes serve different analytical needs. Jitter mode applies a controlled random offset perpendicular to the value axis, creating a scatter cloud where density is visible through dot clustering. Beeswarm mode uses force-directed packing to position dots as close to the center line as possible without overlap, producing a violin-like shape that reveals distribution contours precisely.",
            "Currency and percentage formats are detected automatically from the data model. Conditional color formatting highlights individual data points that meet specific thresholds. Unlimited reference bands mark target zones, and a configurable axis range with minimum and maximum controls provides precise scale management. Small multiples split the chart into a trellis grid for cross-segment comparison. Cross-filtering, drill-down, drill-through, report page tooltips, and context menus all work natively.",
        ],
        featuresFull: [
            "Every data point rendered as an individual dot within category swim lanes",
            "Two layout modes: Jitter (random spread) and Beeswarm (force-packed, no overlap)",
            "Adjustable jitter amount and beeswarm padding for density control",
            "Currency and percentage formatting detected automatically from the data model",
            "Conditional color formatting with numeric rules or field-value mapping",
            "Configurable axis range with minimum and maximum controls",
            "Unlimited reference bands with color, opacity, labels, and font formatting",
            "Small multiples with axis coupling and range matching",
            "Cross-filtering, drill-down, drill-through, report page tooltips, and context menus",
        ],
        upcoming: [],
        /* TODO: replace "#" with the Microsoft AppSource product URL once published */
        appSourceUrl: "#",
        tutorialUrl: null,
        previewSrc: "/cbt-custom-visuals/jitter-plot.png",
    },
];

export function getVisualBySlug(slug: string): Visual | undefined {
    return VISUALS.find((v) => v.slug === slug);
}

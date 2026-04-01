import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Skip to main content — accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-semibold focus:shadow-lg"
            >
                Skip to main content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
        </>
    );
}

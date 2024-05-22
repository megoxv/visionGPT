export default function PricingLayout({ children }) {
    return (
        <div className="relative flex min-h-dvh flex-col bg-background bg-radial pt-16">
            <section className="max-w-[1280px] px-6 mt-16 mx-auto">
                {children}
            </section>
        </div>
    );
}
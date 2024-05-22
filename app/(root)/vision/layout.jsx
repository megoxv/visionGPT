export default function VisionLayout({ children }) {
    return (
        <div className="relative flex min-h-dvh flex-col bg-background bg-radial pt-16">
            <section className="max-w-4xl px-6 mx-auto">
                {children}
            </section>
        </div>
    );
}
import '@/styles/globals.css';
import RootProvider from './RootProvider';

export const metadata = {
    title: "Miru"
}


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="dark:bg-black dark:text-white dark:bg-opacity-80">
                <RootProvider>
                    <div className="ml-0 lg:ml-230px">
                        <div className="m-auto" style={{ maxWidth: "1400px" }}>
                            {children}
                        </div>
                        <div className='h-28 lg:hidden'></div>
                    </div>
                </RootProvider>
            </body>
        </html>
    )
}
import Head from 'next/head';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Web App Frontend</title>
        <meta name="description" content="A simple web application frontend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Web App</h1>
        <p className="text-xl mb-8">Get started by editing pages/index.js</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <p>Explore the features of your web application here.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Documentation</h2>
            <p>Find helpful resources and documentation here.</p>
          </div>
        </div>
      </main>

      <footer className="flex justify-center items-center border-t mt-8 py-4">
        <p>Powered by Next.js and Tailwind CSS</p>
      </footer>
    </div>
  );
}

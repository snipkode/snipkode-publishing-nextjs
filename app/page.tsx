import Link from 'next/link';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Online Book Store</h1>
            <p className="text-lg mb-8">Read, Write, and Publish your favorite books.</p>
            <div className="space-x-4">
                <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded">Register</Link>
                <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded">Login</Link>
            </div>
        </div>
    );
};

export default Home;

import Link from 'next/link';
import Image from 'next/image';

export const dynamic = "force-dynamic";

// Fetch all posts from Payload
async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/posts`, {
    next: { revalidate: 60 }, // Re-fetch every 60 seconds so new blogs appear automatically
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export const metadata = {
  title: 'Gaming Guides & News | Boosting Nation',
  description: 'Read the latest gaming guides, meta loadouts, and boosting tips from our top-tier players.',
};

export default async function BlogsPage() {
  const data = await getPosts();
  const posts = data.docs;

  return (
    // 👇 FIX 1: Added pt-28 (mobile) and md:pt-32 (desktop) to clear the fixed navbar
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 w-full">
      
      {/* 👇 FIX 2: Responsive heading size and centering on mobile */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 sm:mb-12 text-center md:text-left">
        Latest Guides & News
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post: any) => (
          <Link href={`/blogs/${post.slug}`} key={post.id} className="block group h-full">
            
            {/* 👇 FIX 3: Added flex flex-col and h-full so all cards in a row are the exact same height */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] h-full flex flex-col">
              
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative h-48 sm:h-56 w-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={post.coverImage.url} 
                    alt={post.coverImage.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {/* flex-grow pushes the "Read Article" button to the very bottom */}
                <p className="text-gray-400 line-clamp-3 text-sm sm:text-base flex-grow">
                  {post.seoDescription}
                </p>
                
                <div className="mt-6 text-blue-500 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                  Read Article <span>→</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
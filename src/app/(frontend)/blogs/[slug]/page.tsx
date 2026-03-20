import Image from 'next/image';
import { notFound } from 'next/navigation';

// Fetch a single post by its slug
async function getPost(slug: string) {
 const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/posts?where[slug][equals]=${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.docs[0];
}

// Dynamically generate SEO Metadata for Google!
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; 
  const post = await getPost(resolvedParams.slug);
  
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Boosting Nation`,
    description: post.seoDescription,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound(); 
  }

  return (
    // FIX 1: Added pt-28 (mobile) and md:pt-32 (desktop) to push it below the navbar
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 w-full">
      
      {/* Header Section */}
      <header className="mb-8 md:mb-12 text-center">
        {/* FIX 2: Responsive text (text-3xl on mobile, text-5xl on desktop) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Hero Image */}
      {post.coverImage && (
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden mb-10 shadow-2xl">
          {/* FIX 3: Responsive image height (comment moved inside the div to fix syntax error) */}
          <Image 
            src={post.coverImage.url} 
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content Section */}
      <div className="prose prose-invert prose-blue max-w-none prose-base sm:prose-lg w-full">
        {/* FIX 4: Added break-words and overflow-hidden so the JSON doesn't stretch the mobile screen */}
        <pre className="whitespace-pre-wrap break-words text-gray-300 font-sans text-sm sm:text-base bg-transparent border-none p-0 w-full overflow-x-hidden">
          {JSON.stringify(post.content, null, 2)}
        </pre>
      </div>

    </article>
  );
}
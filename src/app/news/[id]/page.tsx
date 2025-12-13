import Image from 'next/image';
import { getNewsArticleById, getNewsArticles } from '@/services/firestore';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';

export const dynamic = "force-dynamic";

// Simple Markdown to HTML
const Markdown = ({ text }: { text: string }) => {
  const html = text
    .split('\n')
    .map(line => line.trim() === '' ? '<br/>' : `<p>${line}</p>`)
    .join('');
  return <div dangerouslySetInnerHTML={{ __html: html }} className="prose lg:prose-xl max-w-none text-slate-600" />;
}

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = await getNewsArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link href="/news" className="text-brand-orange hover:underline">
                &larr; Back to News
              </Link>
            </div>

            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl mb-4">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </header>

            <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-lg mb-12">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={article.aiHint || 'news article'}
                priority
              />
            </div>

            <div className="prose lg:prose-xl max-w-none text-slate-600 space-y-4">
              <Markdown text={article.content} />
            </div>

          </article>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

// export async function generateStaticParams() {
//   const articles = await getNewsArticles();
//   return articles.map((article) => ({
//     id: article.id,
//   }));
// }

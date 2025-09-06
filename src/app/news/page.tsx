import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { getNewsArticles } from '@/services/firestore';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChatWidget } from '@/components/layout/chat-widget';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              News & Updates
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
              Stay up to date with our latest activities, announcements, and stories from the field.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <Link href={`/news/${article.id}`} className="block">
                    <div className="relative h-56 w-full">
                    <Image src={article.image} alt={article.title} fill className="object-cover" data-ai-hint={article.aiHint || 'news article'} />
                    </div>
                </Link>
                <CardHeader>
                    <CardTitle className="text-slate-800 hover:text-brand-orange">
                        <Link href={`/news/${article.id}`}>{article.title}</Link>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {article.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-600">{article.summary}</p>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="link" className="p-0 text-brand-orange">
                        <Link href={`/news/${article.id}`}>Read More &rarr;</Link>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center text-slate-500 mt-8">
              <p>No news yet. Please check back soon for updates!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

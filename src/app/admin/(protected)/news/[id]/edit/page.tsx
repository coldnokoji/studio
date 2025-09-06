import { NewsArticleForm } from '@/app/admin/(protected)/news/news-article-form';
import { getNewsArticleById } from '@/services/firestore';
import { notFound } from 'next/navigation';

export default async function EditNewsArticlePage({ params }: { params: { id: string } }) {
  const article = await getNewsArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit News Article</h1>
      <NewsArticleForm article={article} />
    </div>
  );
}

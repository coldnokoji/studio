import { NewsArticleForm } from '@/app/admin/news/news-article-form';

export default function NewNewsArticlePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Add New News Article</h1>
      <NewsArticleForm />
    </div>
  );
}

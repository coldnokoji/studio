import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getNewsArticles } from '@/services/firestore';
import { deleteNewsArticleAction } from '@/app/admin/(protected)/news/actions';

export default async function AdminNewsPage() {
  const articles = await getNewsArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage News Articles</h1>
        <Button asChild>
          <Link href="/admin/news/new">Add New Article</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>
                By {article.author} on {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{article.summary}</p>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/news/${article.id}/edit`}>Edit</Link>
                </Button>
                <form action={deleteNewsArticleAction.bind(null, article.id)}>
                    <Button variant="destructive" type="submit">Delete</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
         {articles.length === 0 && (
            <p>No articles found. Add one to get started.</p>
        )}
      </div>
    </div>
  );
}

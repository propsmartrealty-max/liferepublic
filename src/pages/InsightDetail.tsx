import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getInsightData } from '../data/insights';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { ChevronRight, Calendar, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const InsightDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const article = slug ? getInsightData(slug) : null;

    if (!article) {
        return <Navigate to="/insights" replace />;
    }

    return (
        <div className="bg-surface min-h-screen pt-32 pb-24">
            <Helmet>
                <title>{article.title}</title>
                <meta name="description" content={article.excerpt} />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema({
                        title: article.title,
                        description: article.excerpt,
                        slug: article.slug,
                        date: article.publishDate
                    }))}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(generateBreadcrumbSchema([
                        { name: 'Home', item: '/' },
                        { name: 'Insights', item: '/insights' },
                        { name: article.title, item: `/insights/${article.slug}` }
                    ]))}
                </script>
            </Helmet>

            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold tracking-tight font-medium text-gray-500 mb-12 overflow-x-auto whitespace-nowrap pb-2">
                    <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link to="/insights" className="hover:text-accent transition-colors">Insights</Link>
                    <ChevronRight size={12} />
                    <span className="text-primary-dark">{article.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <header className="mb-12">
                            <span className="text-accent text-xs font-bold tracking-tight font-semibold block mb-4">
                                {article.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-6 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-secondary">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-accent" />
                                    <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </header>

                        {/* Article Content */}
                        <article 
                            className="prose prose-lg prose-headings:font-serif prose-headings:text-primary-dark prose-p:text-secondary prose-a:text-accent hover:prose-a:text-accent-dark max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-gray-200">
                            {article.tags.map(tag => (
                                <div key={tag} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-500">
                                    <Tag size={12} className="text-accent" />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100%] pointer-events-none"></div>
                                <h3 className="text-2xl font-serif font-bold text-primary-dark mb-2">Interested in {article.title.split('|')[0].trim()}?</h3>
                                <p className="text-sm text-secondary mb-6">Schedule a virtual tour or get the latest price sheet.</p>
                                <Button 
                                    className="w-full shadow-lg" 
                                    onClick={() => window.dispatchEvent(new CustomEvent('open-enquiry-modal'))}
                                >
                                    Request Callback
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

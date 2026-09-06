import React from 'react';
import { Link } from 'react-router-dom';
import { getRelatedPosts } from '../data/blogPosts';

export default function RelatedPosts({ currentLink, categories }) {
  const related = getRelatedPosts(currentLink, categories);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.link}
            to={post.link}
            className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-600/20 transition-shadow duration-300 group"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={post.image}
                alt={post.imageText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 bg-purple-600/20 text-purple-400 text-xs rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-gray-200 group-hover:text-purple-400 transition-colors duration-150 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

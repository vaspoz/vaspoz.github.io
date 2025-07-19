import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon, ChartBarIcon, LightBulbIcon, CodeBracketIcon, BugAntIcon, SparklesIcon, PhotoIcon } from '@heroicons/react/24/solid';

interface Issue {
  id: number;
  title: string;
  date: string;
  news: string[];
  articles: string[];
  goodFirstIssue: string;
  repositories: string[];
  topics: string[];
  readTime: string;
  url: string;
  uselessFact: string;
  funImageUrl: string;
  image?: string;
  preview?: string;
}

// Function to extract structured content from issue HTML
const extractIssueContent = async (issueUrl: string): Promise<{ title: string; news: string[]; articles: string[]; goodFirstIssue: string; repositories: string[]; topics: string[]; uselessFact: string; funImageUrl: string }> => {
  try {
    // Use CORS proxy for browser requests
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const response = await fetch(proxyUrl + encodeURIComponent(`https://archive.0xcafe.news${issueUrl}`));
    const data = await response.json();
    const htmlContent = data.contents;
    
    if (!htmlContent) {
      throw new Error('No content received from proxy');
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract simplified title
    const title = `Issue ${issueUrl.replace('/', '').replace('-2025', '')}`;
    
    // 1. Extract News
    const newsLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('theguardian.com') || href.includes('arstechnica.com') || 
             href.includes('techcrunch.com') || href.includes('reuters.com') || 
             href.includes('bbc.com') || href.includes('cnn.com') || 
             href.includes('bloomberg.com') || href.includes('wired.com');
    });
    
    const news = newsLinks.slice(0, 4).map(link => link.textContent?.trim() || '').filter(title => title.length > 0);
    
    // 2. Extract Articles
    const articleLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || '';
      const text = a.textContent?.toLowerCase() || '';
      return (href.includes('medium.com') || href.includes('dev.to') || 
              href.includes('hackernoon.com') || href.includes('freecodecamp.org') ||
              text.includes('article') || text.includes('tutorial') || text.includes('guide')) && 
             !href.includes('github.com') && !newsLinks.includes(a);
    });
    
    const articles = articleLinks.slice(0, 3).map(link => link.textContent?.trim() || '').filter(title => title.length > 0);
    
    // 3. Extract Good First Issue
    let goodFirstIssue = '';
    const gfiLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('github.com') && href.includes('good-first-issues');
    });
    
    if (gfiLinks.length > 0) {
      goodFirstIssue = gfiLinks[0].textContent?.trim() || '';
    } else {
      // Fallback: look for GitHub issues
      const issueLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
        const href = a.getAttribute('href') || '';
        return href.includes('github.com') && href.includes('/issues/');
      });
      if (issueLinks.length > 0) {
        goodFirstIssue = issueLinks[0].textContent?.trim() || '';
      }
    }
    
    // 4. Extract Repositories
    const repoLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('github.com') && href.split('/').length >= 5 && 
             !href.includes('/issues/') && !href.includes('/pull/') && !href.includes('/blob/');
    });
    
    const repositories: string[] = [];
    for (const link of repoLinks) {
      const href = link.getAttribute('href') || '';
      const urlParts = href.split('/');
      if (urlParts.length >= 5) {
        const owner = urlParts[3];
        const repo = urlParts[4];
        const repoName = `${owner}/${repo}`;
        if (!repositories.includes(repoName) && repositories.length < 5) {
          repositories.push(repoName);
        }
      }
    }
    
    // 5. Extract Useless Fact of the Day
    let uselessFact = '';
    // Look for div containing "Useless Fact of the Day" string
    const allDivs = Array.from(doc.querySelectorAll('div'));
    const factHeaderDiv = allDivs.find(div => {
      const text = div.textContent?.toLowerCase() || '';
      return text.includes('useless fact of the day');
    });
    
    if (factHeaderDiv && factHeaderDiv.parentElement) {
      // The fact content is in a sibling div within the same parent container
      const parentDiv = factHeaderDiv.parentElement;
      const contentDivs = Array.from(parentDiv.querySelectorAll('div'));
      // Find a div that contains actual content (not the header)
      const factContentDiv = contentDivs.find(div => {
        const text = div.textContent?.trim() || '';
        return text.length > 20 && !text.toLowerCase().includes('useless fact of the day');
      });
      
      if (factContentDiv) {
        uselessFact = factContentDiv.textContent?.trim() || '';
      }
    }
    
    // 6. Extract Fun Image URL
    let funImageUrl = '';
    // Look for images that might be fun/random images
    const allImages = Array.from(doc.querySelectorAll('img'));
    const funImages = allImages.filter(img => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt')?.toLowerCase() || '';
      return src.includes('unsplash') || src.includes('giphy') || 
             src.includes('imgur') || alt.includes('fun') || 
             alt.includes('random') || alt.includes('image');
    });
    
    if (funImages.length > 0) {
      funImageUrl = funImages[0].getAttribute('src') || '';
    }
    
    // Extract topics based on content
    const topics = extractTopicsFromContent(htmlContent);
    
    return { 
      title, 
      news, 
      articles, 
      goodFirstIssue, 
      repositories, 
      topics,
      uselessFact,
      funImageUrl
    };
  } catch (error) {
    console.error(`Failed to fetch content for ${issueUrl}:`, error);
    return {
      title: `Issue ${issueUrl.replace('/', '').replace('-2025', '')}`,
      news: [],
      articles: [],
      goodFirstIssue: '',
      repositories: [],
      topics: ["Tech News", "Development", "Tools", "Insights"],
      uselessFact: '',
      funImageUrl: ''
    };
  }
};

// Helper function to extract topics from content
const extractTopicsFromContent = (htmlContent: string): string[] => {
  const techKeywords = {
    'AI': ['AI', 'artificial intelligence', 'machine learning', 'ChatGPT', 'OpenAI'],
    'JavaScript': ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js'],
    'Python': ['Python', 'Django', 'Flask', 'pandas', 'numpy'],
    'Cloud': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
    'GitHub': ['GitHub', 'Git', 'repository', 'open source'],
    'Development': ['development', 'programming', 'coding', 'software'],
    'Security': ['security', 'cybersecurity', 'vulnerability', 'encryption'],
    'Web Development': ['web development', 'frontend', 'backend', 'API'],
    'DevOps': ['DevOps', 'CI/CD', 'deployment', 'infrastructure'],
    'Mobile': ['mobile', 'iOS', 'Android', 'React Native', 'Flutter']
  };
  
  const foundTopics: string[] = [];
  const contentLower = htmlContent.toLowerCase();
  
  for (const [topic, keywords] of Object.entries(techKeywords)) {
    if (keywords.some(keyword => contentLower.includes(keyword.toLowerCase()))) {
      foundTopics.push(topic);
    }
  }
  
  // Return up to 4 topics, with fallbacks if none found
  const topics = foundTopics.slice(0, 4);
  if (topics.length === 0) {
    return ["Tech News", "Development", "Tools", "Insights"];
  }
  
  // Fill up to 4 topics with defaults if needed
  while (topics.length < 3) {
    const defaults = ["Tech News", "Development", "Tools", "Insights", "Open Source"];
    const toAdd = defaults.find(def => !topics.includes(def));
    if (toAdd) topics.push(toAdd);
    else break;
  }
  
  return topics;
};

// Function to fetch archive links from the archive page
const fetchArchiveIssues = async (): Promise<Issue[]> => {
  try {
    // Define the recent issue URLs to fetch
    const issueUrls = [
      { url: '/18-Jul-2025', date: 'July 18, 2025' },
      { url: '/17-Jul-2025', date: 'July 17, 2025' },
      { url: '/16-Jul-2025', date: 'July 16, 2025' }
    ];
    
    // Extract content for each issue
    const issuePromises = issueUrls.map(async (issueData, index) => {
      const extracted = await extractIssueContent(issueData.url);
      
      return {
        id: index + 1,
        title: extracted.title,
        date: issueData.date,
        news: extracted.news,
        articles: extracted.articles,
        goodFirstIssue: extracted.goodFirstIssue,
        repositories: extracted.repositories,
        topics: extracted.topics,
        readTime: "~10 min read",
        url: issueData.url,
        uselessFact: extracted.uselessFact,
        funImageUrl: extracted.funImageUrl
      };
    });
    
    const recentIssues = await Promise.all(issuePromises);
    console.log('Fetched real content for issues:', recentIssues);
    
    return recentIssues;
  } catch (error) {
    console.error('Failed to fetch archive issues:', error);
    return [];
  }
};

// Helper function to format date
const formatDate = (dateStr: string): string => {
  try {
    const [day, month, year] = dateStr.split('-');
    const monthNames = {
      'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
      'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
      'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
    };
    return `${monthNames[month as keyof typeof monthNames]} ${parseInt(day)}, ${year}`;
  } catch {
    return dateStr;
  }
};


const NewsletterPreview: React.FC = () => {
  const [currentIssue, setCurrentIssue] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        const fetchedIssues = await fetchArchiveIssues();
        setIssues(fetchedIssues);
      } catch (error) {
        console.error('Error loading issues:', error);
        setIssues([]); // Clear issues on error
      } finally {
        setLoading(false);
      }
    };
    
    loadIssues();
  }, []);

  const nextIssue = () => {
    setCurrentIssue((prev) => (prev + 1) % issues.length);
  };

  const prevIssue = () => {
    setCurrentIssue((prev) => (prev - 1 + issues.length) % issues.length);
  };

  const issue = issues[currentIssue];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cafe-400 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Recent <span className="bg-gradient-to-r from-cafe-400 to-purple-400 bg-clip-text text-transparent">Issues</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get a taste of what you'll receive every week. High-quality, actionable insights 
            delivered straight to your inbox.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Issue navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevIssue}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-2">
              {issues.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIssue(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIssue 
                      ? 'bg-cafe-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextIssue}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              Next
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Newsletter preview card */}
          {loading ? (
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden p-8 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
              <p className="text-gray-400 mt-4">Loading recent issues...</p>
            </div>
          ) : (
            <motion.div
              key={currentIssue}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all duration-300"
            >
              <div className="p-8">
                {/* Issue header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {issue.date}
                  </div>
                  <div className="text-sm text-cafe-400 font-medium">
                    {issue.readTime}
                  </div>
                </div>

                {/* Issue title */}
                <h3 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-8 leading-tight">
                  Issue #{issue.url.replace('/', '').replace('-Jul-2025', '').replace('-2025', '')}
                </h3>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {issue.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-cafe-400/20 to-purple-400/20 text-cafe-300 text-sm rounded-full border border-cafe-400/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Issue content sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* News Section */}
                  {issue.news.length > 0 && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <ChartBarIcon className="w-6 h-6 text-cafe-400" />
                        <h4 className="font-poppins font-semibold text-lg text-white">Tech News</h4>
                      </div>
                      <div className="space-y-3">
                        {issue.news.map((newsItem, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-cafe-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">{newsItem}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles Section */}
                  {issue.articles.length > 0 && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <LightBulbIcon className="w-6 h-6 text-purple-400" />
                        <h4 className="font-poppins font-semibold text-lg text-white">Must-Read Articles</h4>
                      </div>
                      <div className="space-y-3">
                        {issue.articles.map((article, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">{article}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Repositories Section */}
                  {issue.repositories.length > 0 && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <CodeBracketIcon className="w-6 h-6 text-green-400" />
                        <h4 className="font-poppins font-semibold text-lg text-white">Trending Repos</h4>
                      </div>
                      <div className="space-y-3">
                        {issue.repositories.map((repo, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                            <code className="text-green-400 font-mono text-sm">{repo}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Good First Issue Section */}
                  {issue.goodFirstIssue && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <BugAntIcon className="w-6 h-6 text-yellow-400" />
                        <h4 className="font-poppins font-semibold text-lg text-white">Good First Issue</h4>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">{issue.goodFirstIssue}</p>
                      </div>
                    </div>
                  )}

                  {/* Useless Fact Section */}
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <SparklesIcon className="w-6 h-6 text-indigo-400" />
                      <h4 className="font-poppins font-semibold text-lg text-white">Useless Fact of the Day</h4>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      {issue.uselessFact ? (
                        <p className="text-gray-300 text-sm leading-relaxed">{issue.uselessFact}</p>
                      ) : (
                        <p className="text-gray-300 text-sm leading-relaxed italic">"A random, delightfully pointless fact to brighten your day and impress your colleagues."</p>
                      )}
                    </div>
                  </div>

                  {/* Fun Image Section */}
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <PhotoIcon className="w-6 h-6 text-pink-400" />
                      <h4 className="font-poppins font-semibold text-lg text-white">Random Fun Image</h4>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed italic">"A surprise image to add a smile to your tech-filled day."</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(`https://archive.0xcafe.news${issue.url}`, '_blank')}
                    className="bg-gradient-to-r from-cafe-400 to-cafe-500 hover:from-cafe-500 hover:to-cafe-600 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Read Full Issue
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">
              Want to receive issues like this every week?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              Subscribe Now - It's Free
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPreview;

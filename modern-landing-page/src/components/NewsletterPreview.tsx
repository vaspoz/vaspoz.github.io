import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Issue {
  id: number;
  title: string;
  date: string;
  preview: string;
  topics: string[];
  readTime: string;
  image: string;
  url: string;
}

// Function to extract content snippet from issue HTML
const extractIssueContent = async (issueUrl: string): Promise<{ title: string; preview: string; topics: string[] }> => {
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
    
    // Extract title - construct from URL
    const title = `0xCAFE Newsletter - ${issueUrl.replace('/', '')}`;
    
    // Extract useless fact
    let uselessFact = '';
    const factElements = Array.from(doc.querySelectorAll('div')).filter(div => {
      const text = div.textContent || '';
      return text.includes('🙈 Useless Fact of the Day');
    });
    
    if (factElements.length > 0) {
      const factDiv = factElements[0];
      const factText = factDiv.textContent?.replace('🙈 Useless Fact of the Day', '').trim();
      if (factText && factText.length > 10) {
        uselessFact = factText.substring(0, 120) + '....';
      }
    }
    
    // Extract first news item
    let firstNews = '';
    const newsLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('theguardian.com') || href.includes('arstechnica.com') || href.includes('techcrunch.com');
    });
    
    if (newsLinks.length > 0) {
      const newsTitle = newsLinks[0].textContent?.trim();
      if (newsTitle && newsTitle.length > 10) {
        firstNews = newsTitle.substring(0, 100) + '...';
      }
    }
    
    // Extract GitHub repositories - look for repo names in links
    let topRepo = '';
    const repoLinks = Array.from(doc.querySelectorAll('a')).filter(a => {
      const href = a.getAttribute('href') || '';
      return href.includes('github.com') && href.split('/').length >= 5;
    });
    
    // Look for repo names that actually contain "/" (owner/repo format)
    for (const link of repoLinks) {
      const repoName = link.textContent?.trim();
      if (repoName && repoName.includes('/') && !repoName.includes('http')) {
        topRepo = repoName;
        break;
      }
    }
    
    // If no "/" format found, extract from URL
    if (!topRepo && repoLinks.length > 0) {
      const href = repoLinks[0].getAttribute('href') || '';
      const urlParts = href.split('/');
      if (urlParts.length >= 5) {
        const owner = urlParts[3];
        const repo = urlParts[4];
        topRepo = `${owner}/${repo}`;
      }
    }
    
    // Construct preview from extracted content
    let preview = '';
    if (uselessFact) {
      preview += `💡 Useless Fact: ${uselessFact} `;
    }
    if (firstNews) {
      preview += `📰 Today: ${firstNews} `;
    }
    if (topRepo) {
      preview += `🚀 Featured: ${topRepo}`;
    }
    
    // Fallback preview if nothing extracted
    if (!preview.trim()) {
      preview = "Today's digest of tech news, trending GitHub repositories, developer tools, and that random fact to impress your colleagues.";
    }
    
    // Extract topics based on content
    const topics = extractTopicsFromContent(htmlContent);
    
    return { title, preview: preview.trim(), topics };
  } catch (error) {
    console.error(`Failed to fetch content for ${issueUrl}:`, error);
    return {
      title: `0xCAFE Newsletter - ${issueUrl.replace('/', '')}`,
      preview: "Your daily dose of curated tech insights, trending repositories, and developer tools.",
      topics: ["Tech News", "Development", "Tools", "Insights"]
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
    
    const images = [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format&q=80"
    ];
    
    // Extract content for each issue
    const issuePromises = issueUrls.map(async (issueData, index) => {
      const extracted = await extractIssueContent(issueData.url);
      
      return {
        id: index + 1,
        title: extracted.title,
        date: issueData.date,
        preview: extracted.preview,
        topics: extracted.topics,
        readTime: "~10 min read",
        image: images[index],
        url: issueData.url
      };
    });
    
    const recentIssues = await Promise.all(issuePromises);
    console.log('Fetched real content for issues:', recentIssues);
    
    return recentIssues;
  } catch (error) {
    console.error('Failed to fetch archive issues:', error);
    return fallbackIssues;
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

// Fallback issues in case fetching fails
const fallbackIssues: Issue[] = [
  {
    id: 1,
    title: "Latest Tech Insights & Developer Updates",
    date: "July 18, 2025",
    preview: "Daily dose of tech insights, trending repositories, must-read articles, and developer tools to keep you ahead in the fast-moving world of technology...",
    topics: ["Tech News", "Development", "AI", "Open Source"],
    readTime: "~10 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format",
    url: "/18-Jul-2025"
  },
  {
    id: 2,
    title: "Weekly Developer Digest",
    date: "July 17, 2025",
    preview: "Curated selection of the week's best programming articles, GitHub repositories, tech news, and tools that matter to developers...",
    topics: ["Programming", "GitHub", "Tools", "News"],
    readTime: "~10 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format",
    url: "/17-Jul-2025"
  },
  {
    id: 3,
    title: "Morning Tech Brief",
    date: "July 16, 2025",
    preview: "Your morning dose of developer insights, trending projects, useful resources, and everything you need to stay updated in tech...",
    topics: ["Development", "Resources", "Trends", "Updates"],
    readTime: "~10 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format",
    url: "/16-Jul-2025"
  }
];

const NewsletterPreview: React.FC = () => {
  const [currentIssue, setCurrentIssue] = useState(0);
  const [issues, setIssues] = useState<Issue[]>(fallbackIssues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        const fetchedIssues = await fetchArchiveIssues();
        setIssues(fetchedIssues);
      } catch (error) {
        console.error('Error loading issues:', error);
        setIssues(fallbackIssues);
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
            <div className="md:flex">
              {/* Issue image */}
              <div className="md:w-2/5">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Issue content */}
              <div className="md:w-3/5 p-8">
                {/* Issue header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {issue.date}
                  </div>
                  <div className="text-sm text-cafe-400 font-medium">
                    {issue.readTime}
                  </div>
                </div>

                {/* Issue title */}
                <h3 className="font-poppins font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
                  {issue.title}
                </h3>

                {/* Issue preview */}
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {issue.preview}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {issue.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-cafe-400/20 to-purple-400/20 text-cafe-300 text-sm rounded-full border border-cafe-400/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(`https://archive.0xcafe.news${issue.url}`, '_blank')}
                    className="bg-gradient-to-r from-cafe-400 to-cafe-500 hover:from-cafe-500 hover:to-cafe-600 text-black font-semibold px-6 py-2 rounded-xl transition-all duration-300"
                  >
                    Read Full Issue
                  </motion.button>
                </div>
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

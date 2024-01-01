const Blog = require("../models/blogSchema");
const { countMatchingWords } = require("../utils/utils");

/****************************************************************************************
 * @GET_BLOGS_BY_CATEGORY_OR_DATE
 * @route http://localhost:4000/api/v1/blogs/getBlogs/:sortBy
 * @requestType GET
 * @description GetSortedBlogs Controller for getting blogs' data based on category or date
 * @parameters sortBy
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const getSortedBlogs = async (req, res) => {
  try {
    const { sortBy } = req.params;

    // Check if required info was sent in request or not
    if (!sortBy) {
      return res.status(400).json({
        success: false,
        message:
          "Required information/fields is/are missing! Please provide it & try again.",
      });
    }

    let blogs;

    // Get blogs based on the specified sort criteria and published status
    if (sortBy.toLowerCase() === "category") {
      blogs = await Blog.find({ published: true }).sort({
        category: 1,
        createdAt: -1,
      });
    } else if (sortBy.toLowerCase() === "date") {
      blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    } else {
      return res
        .status(400)
        .json({ error: 'Invalid sortBy parameter. Use "category" or "date".' });
    }

    blogs = blogs.map((blog) => ({
      title: blog.title,
      author: blog.author.fullname,
      category: blog.category,
      likesCount: blog.likes?.length,
      dislikesCount: blog.dislikes?.length,
      blogThumbnail: blog.blogThumbnail,
    }));

    const categoryWiseBlogsList = [];

    // Organize blogs into categories
    const categorizedBlogs = {};
    blogs.forEach((blog) => {
      if (!categorizedBlogs[blog.category]) {
        categorizedBlogs[blog.category] = [];
      }
      categorizedBlogs[blog.category].push();
    });

    // Convert categorizedBlogs into the desired response format
    for (const category in categorizedBlogs) {
      categoryWiseBlogsList.push({ [category]: categorizedBlogs[category] });
    }

    if (sortBy === "category") {
      res.status(200).json({ categoryWiseBlogsList });
    } else if (sortBy === "date") {
      res.status(200).json({ dateWiseBlogsList: blogs });
    }
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while fetching blogs' data!",
    });
  }
};

/****************************************************************************************
 * @SEARCH_BLOGS
 * @route http://localhost:4000/api/v1/blogs/searchBlogs
 * @requestType GET
 * @description SearchBlogs Controller for searching blogs using a search keyword/text
 * @parameters searchText
 * @returns JSON object( containing response message, response data)
 **************************************************************************************/
const searchBlogs = async (req, res) => {
  try {
    const { searchText } = req.body;

    if (!searchText) {
      return res.status(400).json({
        success: false,
        message:
          "Search keyword/text must contain at least one word with a minimum of 3 characters.",
      });
    }
    // Split the input text into an array of words
    const wordsArray = searchText.trim().toLowerCase().split(/\s+/);

    // Ensure at least one word in the array has a minimum of 3 characters
    const validWords = wordsArray.filter((word) => word.length >= 3);

    if (validWords.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Search keyword/text must contain at least one word with a minimum of 3 characters.",
      });
    }

    // Get all the published/publicly-available blogs
    const blogs = await Blog.find({ published: true });
    if (!(blogs && blogs.length > 0)) {
      return res.status(404).json({
        success: false,
        message:
          "No results were found for the provided search keyword/text. Please try changing the search keyword/text before searching again.",
      });
    }

    // Calculate a relevance score for each blog based on the match with the search text
    const blogsWithScore = blogs.map((blog) => {
      const titleMatch = countMatchingWords(
        blog.title?.toLowerCase(),
        validWords.join(" ")
      );
      const tagsMatch = blog.tags
        ? countMatchingWords(
            blog.tags.join(" ")?.toLowerCase(),
            validWords.join(" ")
          )
        : 0;
      const totalMatch = titleMatch + tagsMatch;
      return { blog, totalMatch };
    });

    // Sort blogs based on the totalMatch in descending order
    const sortedBlogs = blogsWithScore.sort(
      (a, b) => b.totalMatch - a.totalMatch
    );

    res.status(200).json({
      success: true,
      message:
        "Search results containing blog data have been fetched successfully.",
      searchResults: sortedBlogs.map((item) => item.blog),
    });
  } catch (error) {
    console.error(error);
    res.status(405).json({
      success: false,
      message: "Error occurred while searching through the blogs.",
    });
  }
};

module.exports = {
  getSortedBlogs,
  searchBlogs,
};

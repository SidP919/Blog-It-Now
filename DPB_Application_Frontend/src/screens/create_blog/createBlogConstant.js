export const CREATE_BLOG_DEFAULT_CONTENT = [
  {
    dataTitle: 'Title *',
    dataLabel: 'title',
    dataContentPH: 'Give a catchy name for your blog.',
    dataContent: '',
    dataType: 'textInput',
    disabled: false,
  },
  {
    dataTitle: 'Author *',
    dataLabel: 'authorName',
    dataContentPH: 'Your name',
    dataContent: '',
    dataType: 'text',
    disabled: true,
  },
  {
    dataTitle: 'Category *',
    dataLabel: 'category',
    dataContentPH: 'Select Category',
    dataContent: '',
    dataType: 'dropdown',
    disabled: false,
    dropdownOptions: [],
  },
  {
    dataTitle: 'Thumbnail',
    dataLabel: 'blogThumbnail',
    dataContentPH: 'Give an image link for the thumbnail',
    dataContent: '',
    dataType: 'textInput',
    disabled: false,
  },
  {
    dataTitle: 'Video',
    dataLabel: 'blogVideo',
    dataContentPH: 'YouTube embedded iframe HTML code for your blog',
    dataContent: '',
    dataType: 'textInput',
    disabled: false,
  },
  {
    dataTitle: 'Tags',
    dataLabel: 'tags',
    dataContentPH:
      'Add tags for your blog. Separate tags with commas(,). Eg. technology, finance, lifestyle',
    dataContent: '',
    dataType: 'textInput',
    disabled: false,
  },
  {
    dataTitle: 'Content *',
    dataLabel: 'content',
    // If we ever decide to change the placeholder content, then keep in mind that the content should be less than 1300 characters, because currently for mobile native portrait mode, we are slicing the placeholder content to 1280 characters to avoid the issue of placeholder text overflowing out of the input box. This is a temporary solution until we implement a better design for handling long placeholder text on smaller screens. Search for "item?.dataContentPH.slice(0, 1280).trim()" in FormInput/index.jsx to find the related code.
    dataContentPH: `📝 BLOG CONTENT (Markdown Format Required)

Your blog content must be written in Markdown format for proper styling and structure on Blog-It-Now.

❓ DON'T KNOW MARKDOWN?
No problem! Follow these simple steps:

STEP 1: Draft Your Blog
Write your blog content in plain English (or your preferred language) with clear paragraphs and structure.

STEP 2: Convert to Markdown
Copy your drafted content and paste it into ChatGPT, Claude, or any AI tool using this prompt:

---
"Convert the following blog post into well-formatted Markdown. Use appropriate heading levels (# for main title, ## for sections, ### for subsections), bold (**text**) for emphasis, bullet points or numbered lists where appropriate, code blocks for any code snippets (using backticks), and blockquotes (>) for important notes. Ensure the formatting is clean, readable, and follows Markdown best practices."

[Then paste your blog content below this prompt]
---

STEP 3: Copy the Result
The AI will generate a properly formatted Markdown version. Copy the entire output.

STEP 4: Paste Here
Paste the Markdown content here in this field.

✨ RESULT
Once blog is published, your blog will automatically display with beautiful styling, proper headings, bold text, lists, and all formatting on the Blog-It-Now app!

📌 MARKDOWN QUICK TIPS:
• Use # for Title, ## for Heading, ### for Subheading
• Use **bold text**, *italic text* to show text in bold & italics respectively
• Use - for bullet points
• Use 1. for numbered lists
• Use \`code\` for code snippets
• Use [link text](url) for links
• Use > for blockquotes

NOTE: in a future release, we will automate this markdown conversion right in the app, so you can simply write in plain text and we will convert it for you! For now, please use the above steps to format your blog content in markdown before pasting it here. Thank you for your understanding!


`,
    dataContent: '',
    dataType: 'textarea',
    disabled: false,
  },
];

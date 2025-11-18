ROUTE NORMALIZER - REQUIREMENTS CHECKLIST
=========================================

1. INPUT HANDLING
-----------------
- Accept a raw string representing a route (e.g., " /Products/:Slug/?q=1 ").
- Throw an error if input is not a string.
- Allow empty or malformed input but handle safely (return null or throw).

2. PREPROCESSING (CLEANUP)
--------------------------
- Trim leading and trailing whitespace.
- Convert entire path to lowercase.
- Remove URL scheme ("http://", "https://").
- Remove domain portion (everything before first '/').
- Remove query parameters ("?key=value").
- Remove hash fragments ("#section").
- Collapse multiple slashes into a single slash ("/foo//bar" → "/foo/bar").
- Remove trailing slash unless path is only "/".
- Ensure path starts with a single "/".

3. VALIDATION
--------------
- Ensure the final path begins with "/".
- Ensure no invalid or illegal characters remain.
- Ensure dynamic segments start with ":" and contain valid segment names.
- Detect invalid dynamic segments (e.g., ":123", "::id", ":id-name").

4. SEGMENT EXTRACTION
---------------------
- Split path by "/" and extract all segments.
- Remove empty segments caused by double slashes.
- Produce a clean array of segments.
  Example: "/products/:slug" → ["products", ":slug"].

5. ROUTE CLASSIFICATION
-----------------------
- If ANY segment begins with ":", classify route as "dynamic".
- Otherwise classify route as "static".

6. STANDARDIZED JSON OUTPUT
----------------------------
Return an object with the following shape:

{
  "path": "<normalized-path>",
  "type": "static" | "dynamic",
  "segments": [ ... ],
  "methods": ["GET"],
  "priority": 1,
  "meta": {}
}

Where:
- path     = normalized canonical route string
- type     = "static" or "dynamic"
- segments = array of cleaned segments
- methods  = default ["GET"]
- priority = default 1
- meta     = default {}

7. EDGE CASES TO HANDLE
------------------------
- Root path ("/").
- Path ending with slash ("/blog/" → "/blog").
- Path with query params ("/blog/:id?sort=asc" → "/blog/:id").
- Path with hashes ("/docs#top" → "/docs").
- Full URLs with domain removed ("https://site.com/u/10" → "/u/10").
- Paths with uppercase letters.
- Paths with duplicate slashes.
- Paths with invalid dynamic names.
- Paths containing spaces inside (normalize or reject).

8. TEST CASES TO VERIFY
------------------------
Input: "/products/:slug/"
Output Path: "/products/:slug"
Type: dynamic

Input: " /blog/:ID "
Output Path: "/blog/:id"
Type: dynamic

Input: "https://site.com/user?id=5"
Output Path: "/user"
Type: static

Input: "/hello//world/:ID"
Output Path: "/hello/world/:id"
Type: dynamic

Input: "/"
Output Path: "/"
Type: static

Input: "/docs/v1/api/"
Output Path: "/docs/v1/api"
Type: static

9. SUCCESS CRITERIA
--------------------
The normalizer is considered complete when:
- Any messy or malformed route becomes a consistent normalized route.
- The output strictly matches the defined JSON schema.
- Dynamic vs static detection is always accurate.
- Segment extraction is always correct.
- No domain, query params, or hashes leak into final output.
- Function is pure, deterministic, and easy to test.

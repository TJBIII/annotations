### How I initially approached the problem:

1. Read through all requirements/constraints several times.
2. Create simple user story out of requirements.
3. XML: NSS focused on JSON so I read/researched a little to refamiliarize myself with the differences.
4. Looked at the jQuery docs to see what methods might be useful/inspire a solution.
5. General brainstorming and write down questions/trouble points.
6. Planning general program flow and identify "milestones".
7. Explore some possible trouble points (so I don't waste time doing a bunch of work that will have to be reversed if I hit a major roadblock).




### Basic idea/plan (get MVP working then refactor):

1. Setup:
  * Setup: project workspace, touch files, git init, etc
  * Load text file
  * Load annotation file
  * Take care of any formatting if needed

2. Initialize Annotations:
  * For each annotation in reverse order (to preserve all indices from beginning up to that point)
      * Extract category, start position, and end position
      * Add the closing anchor tag and then the category label after the end position in text
      * Add the beginning anchor tag at the starting position in text
  * Place text with annotations on the DOM

3. Handle add, edit, and delete for annotations.
  * Details will depend on implementation and setup in step 2.

4. Export annotations as JSON to console


### User Story:
As a user (data analyst), I want to...

* easily see all annotations at once.
* be able to delete an annotation.
* be able to edit an annotation.
* be able to add new annotations.
* save the annotations (logged as JSON in browser console).




### Trouble points:

1.  Picking a new word (or phrase) to annotate
  * Difficulty: Dependent on how annotations are represented on the DOM. Right now it is easy to edit or delete an annotation since it is wrapped in an element. Can't use click events on adding a new annotation unless I put each word into it's own element, which then makes dealing with phrases difficult.
  * Possible solution: Have the user fill out a form where they type in the word or phrase they want to annotate and the category. Can then use a substring search to add all of the new annotations.

2. JSON export if start and end indices are needed
  * Difficulty: Extracting annotation indices out of text once annotations are put in may be messy/prone to off-by-1 errors.
  * Possible solution: Keep a copy of the text without any annotations in it for getting the positions. Build up a JS object and keep updating it when annotations are added/edited/deleted. Simple to JSON.stringify() and log to console.


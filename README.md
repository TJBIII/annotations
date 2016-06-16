### How I approached the problem:

1. Read through all requirements/constraints several times.
2. Create simple user story out of requirements.
3. XML: NSS focused on JSON so I read/researched a little to refamiliarize myself with the differences.
4. Looked at the jQuery docs to see what methods might be useful/inspire a solution.
5. General brainstorming and write down questions.
6. Planning general program flow and identify "milestones".
7. Explore some possible trouble points (so I don't waste time doing a bunch of work that will have to be reversed if I hit a major roadblock).




### Basic idea/plan:

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
  * Difficulty: Dependent on how annotations are represented on the DOM. Can't use click events on a word unless I put each word into it's own element, which then makes dealing with phrases difficult.
  * Possible solution: Have the user fill out a form where they type in the word or phrase they want to annotate and the category. Can then use a substring search to add all of the new annotations.


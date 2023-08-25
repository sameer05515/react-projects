## Tweet Application: First Phase: Requirements

Below points done and pushed to repo

- Create basic application to
  - Add update tweet
  - Add update comment
  - Add update nested comment
  - List all Tweets
  - Add one sort button to sort tweets on createdAt

## Tweet Application: First Phase: Bug Fix

- 1 -> All text content saved in tweet, comment, nested comment goes in single line. new line character is not being preserved in UI. However data saved in DB is ok. -- Done
- 2.1 -> Post create new comment, text not get cleared. --Done
- 2.2 -> Post create new Nested comment, text not get cleared. -- Done
- 3 -> increase size of text-area in EditableLabel.jsx to all width of screen or component. Also height to show all text --Done
- 4 -> updated text of EditableLabel component is not being saved on first click of "Update" button -- Unresolved. Moved to TechDebt
- 5 -> Comments and Nested comments get updated, even if textarea containing empty string. Add checks for empty strings same as in case of save comment and nested-comment -- Done
- 6 -> Text of EditableLabel should be wrapped in view mode -- Done
- 7 -> Add one changelog.md file to track what all things done in different iterations -- Done
- 8 -> Make font of tweet, comment and nested text different. eg, tweet bold and some bigger, comment normal, nested comment smaller and italic -- Done
- 9 -> set Times New Roman (serif) font family globally in Tweet application

## Tweet Application: Second Phase: Requirements

- 1 -> Bug Fixes of First Phase. New Development freeze till all major Bug Fix Done for First Phase.
- 2 -> Add buttons to save new Comment, remove onBlur event on text-area for comment
- 3 -> Add one property saveOnBlur(true or false) in EditableLabel.jsx component. If true, then on blur, data will be saved.
- 4 -> Make default sorting order for tweets to descending order, i.e., latest tweet should be displayed first.

### TechDebt
- 1 -> updated text of EditableLabel component is not being saved on first click of "Update" button


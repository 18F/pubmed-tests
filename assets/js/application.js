function initBody() {
  $('body').removeClass('no-js');
}

$(document).ready(function() {
  initBody();
  var radioGroupName;
  // $('input').focus(function(){
  //   $(this).parents('.field').addClass('is-focused')
  //   return false;
  // });

  // $('input').blur(function(){
  //   $(this).parents('.field').removeClass('is-focused')
  //   return false;
  // });

  $('.fieldset--radio .field--radio input').change(function(){
    var radioGroupName = $(this).attr('name');
    $(this).parents('.field--radio').addClass('is-active');
    $('input[type=radio][name=' + radioGroupName + ']').each(function(){
      if ($(this).is(':checked') == false ){
        $(this).parents('.field--radio').removeClass('is-active');
      }
    });
  });
});

// Leaving jQuery out of it unless absolutely necessary
document.addEventListener("DOMContentLoaded", function() {
  // HISTORY
  // Possible to-do: Write to and recover from localstorage?
  var searchInput = document.getElementById('search-input-textarea');
  var searchTableBody = document.getElementById('search-table-body');
  var historyItems = searchTableBody.querySelectorAll('.use-q');
  var historyRemoveItems = searchTableBody.querySelectorAll('.rm-q');
  var emptySearchRow = `
    <tr id="empty-history-row">
      <td colspan="3">You have no history items. Start searching!</td>
    </tr>
  `;  

  // Make history items pop into query box.
  // TO-DO: determine whether to add boolean based on existing string
  // TO-DO: sort out "and/or/nor" options
  for (i = 0; i < historyItems.length; ++i) {
    historyItems[i].addEventListener("click", function(e){
      searchInput.value += ' AND ' + this.parentNode.parentNode.querySelector('.q').innerHTML;
    });
  }
  // Remove history items
  for (i = 0; i < historyRemoveItems.length; ++i) {
    historyRemoveItems[i].addEventListener("click", function(e){
      var row = this.parentElement.parentElement;
      row.parentElement.removeChild(row);
      // Now check the row count and add "no items" if needed.
      var historyRowCount = searchTableBody.querySelectorAll('tr').length;
      if (historyRowCount == 0) {
        searchTableBody.innerHTML = emptySearchRow;
      }
    });
  }
  // Add to history
  // TO-DO: Intercept form submission, add to history, then allow form submission (if it is a submission)
  // TO-DO: Check for empty-history-row and remove if needed.
  // TO-DO: Figure out event delegation and why new add/remove buttons aren't working.
  $(document).on( "click",  'button.add-to-history', function(e) {
    if (searchInput.value.length > 0) {
      // Note that we can't populate results for this query 
      // without actually running the query. 
      var template = document.createElement('template');
      var newRow = `
      <tr>
        <td class="q">${searchInput.value}</td>
        <td class="num">
          <a href="#" title="Results for this query"></a>
        </td>
        <td class="history-controls">
          <button type="button" class="use-q" title="Use this query">&#128269;</button>
          <button type="button" class="rm-q" title="Remove this query">&#128465;</button>
        </td>
      </tr>`;
      template.innerHTML = newRow.trim();
      searchTableBody.appendChild(template.content.firstChild);
    }
    e.preventDefault();
    // This is where form submission check would need to go. 
    // Otherwise we're blocking submission.
  });

  // make history download "work"
  document.getElementById('history-download').addEventListener("click", function(e){
    alert("Your download would be happening now if this weren't a prototype.");
  });
  // Make history clear "work"
  document.getElementById('history-clear').addEventListener("click", function(e){
    searchTableBody.innerHTML = emptySearchRow;
  });

  // Show search details
  // TO-DO: Handle empty query string
  var searchDetails = document.getElementById('search-details');
  document.querySelector('.action-show-details').addEventListener("click", function(e){
    searchDetails.open = true;
  });

  // Add query row
  // TO-DO: Fix event delegation
  // TO-DO: share newRow template? Copy existing HTML?
  var fieldAdder = document.querySelectorAll('button.field-add');
  var newRow = `
  <div class="selector">
  <div>
  <select class="boolean-select" name="">
      <option>AND</option>
      <option>OR</option>
      <option>NOT</option>
  </select>
</div>
<div>
<label for="id-search-opts-{{ num }}">Search in</label>
<select name="search-opts-{{ num }}" id="id-search-opts-{{ num }}">
  <option value="">Search in...</option>
  <option>Affiliation</option>
  <option>All Fields</option>
  <option>Author</option>
  <option>Author - Corporate</option>
  <option>Author - First</option>
  <option>Author - Full</option>
  <option>Author - Identifier</option>
  <option>Author - Last</option>
  <option>Book</option>
  <option>Conflict of Interest Statements</option>
  <option>Date - Completion</option>
  <option>Date - Create</option>
  <option>Date - Entrez</option>
  <option>Date - MeSH</option>
  <option>Date - Modification</option>
  <option>Date - Publication</option>
  <option>EC/RN Number</option>
  <option>Editor</option>
  <option>Filter</option>
  <option>Grant Number</option>
  <option>ISBN</option>
  <option>Investigator</option>
  <option>Investigator - Full</option>
  <option>Issue</option>
  <option>Journal</option>
  <option>Language</option>
  <option>Location ID</option>
  <option>MeSH Major Topic</option>
  <option>MeSH Subheading</option>
  <option>MeSH Terms</option>
  <option>Other Term</option>
  <option>Pagination</option>
  <option>Pharmacological Action</option>
  <option>Publication Type</option>
  <option>Publisher</option>
  <option>Secondary Source ID</option>
  <option>Subject - Personal Name</option>
  <option>Supplementary Concept</option>
  <option>Text Word</option>
  <option>Title</option>
  <option>Title/Abstract</option>
  <option>Transliterated Title</option>
  <option>Volume</option>
</select>
</div>
<div>
<label for="id-search-term-{{ num }}">Search for</label>
<input name="search-term-{{ num }}" id="id-search-term-{{ num }}" placeholder="For..." />
</div>
<div class="actions">
  <button type="button" class="field-add" title="add a row">&#10133;</button>
  <button type="button" class="field-remove" title="remove this row">&#128465;</button>
</div>
</div>
      `;

  for (i = 0; i < fieldAdder.length; ++i) {
    fieldAdder[i].addEventListener("click", function(e) {
      e.preventDefault();
      this.parentNode.parentNode.insertAdjacentHTML('afterend', newRow);
      buildQuery();
    });
  }
});
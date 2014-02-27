'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('Question App: ', function() {

	describe('Initial view: ', function() {
	
		//Navigate to default view
		browser.get('index.html');
		it('should automatically redirect to /table when location hash/fragment is empty', function() {
			expect(browser.getLocationAbsUrl()).toMatch("/table");
		});

	}); //Initial view
	
	describe('Table view: ', function() {
	
		//Navigate to table view
		beforeEach(function() {
			browser.get('index.html#/table');
		});			
		it('should render table view when user navigates to /table', function() {
			var title = element(by.id('tableTitle'));
			expect(title.getText()).toEqual("Table display of questionnaire results");
		});
		
		//Full table before any filters (including two header rows)
		it('should display full table initially', function() {
			var rows = element.all(by.repeater('tableRow in tableRows'));
			rows.then(function(arr) {
				expect(arr.length).toEqual(150);
			});			
		});
		
		//Filter Age=31	
		it('should display right number of rows for Age=31', function() {
			var age = element(by.model('tableSearch.resp_age'));
			age.sendKeys('31');
			var rows = element.all(by.repeater('tableRow in tableRows'));
			rows.then(function(arr) {
				expect(arr.length).toEqual(12);
			});			
		});

		//Click button "Clear filters"
		it('should display full table after clear filters', function() {
			element(by.id('clear')).click();
			var rows = element.all(by.repeater('tableRow in tableRows'));
			rows.then(function(arr) {
				expect(arr.length).toEqual(150);
			});			
		});
		
		//Filter Question="How would you rate this service?"
		//rows=50
		it('should display right number of rows Question', function() {
			var qid = element(by.model('tableSearch.ques_id'));
			qid.sendKeys('2');
			var rows = element.all(by.repeater('tableRow in tableRows'));
			rows.then(function(arr) {
				expect(arr.length).toEqual(50);
			});			
		});
		
		//Filter Answer="Poor"
		//rows=11
		
		//Filter Gender="Male"
		//rows=4
		
	}); //Table view

	describe('Answers view', function() {

		//Navigate to Answers view
		beforeEach(function() {
			browser.get('index.html#/answers');
		});
		it('should render answers view when user navigates to /answers', function() {
			var title = element(by.id('answersTitle'));
			expect(title.getText()).toEqual("Distribution of answers for selected question");
		});

		//Select Question="How often do you expect to use this service"
		//3-Once a month = 14
		
		//Select Gender="Female"
		//3-Once a month = 11
		
		//Select AgeGroup = "51-60"
		//3-Once a month = 2
		
		//Click button "Clear filters"
		
		//Select Question="Have you used this service before?"
		//1-Yes = 22
		
	}); //Answers view

	describe('Groups view: ', function() {

		//Navigate to Groups view
		beforeEach(function() {
			browser.get('index.html#/groups');
		});
		it('should render groups view when user navigates to /groups', function() {
			var title = element(by.id('groupsTitle'));
			expect(title.getText()).toEqual("Percentage distribution of answers for Age Groups for selected question");
		});

		//Select Question="Have you used this service before?"
		//"71-80","2-No" = 5
		
		//Select Question="How often do you expect to use this service"
		//"71-80","1-Daily" = 3
		
	}); //Groups view

}); //Question App

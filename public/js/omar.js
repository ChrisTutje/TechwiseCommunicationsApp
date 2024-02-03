/* Helper Program that will guide new users through the site. Codename OMAR
Amber Miller 
*/
import Shepherd from "/node_modules/shepherd.js";

function OmarTime(){
console.log("hi omar");
const tour = new Shepherd.Tour({
	defaultStepOptions: {
		cancelIcon: {
			enabled: true
		},
		classes: 'class-1 class-2',
		scrollTo: { behavior: 'smooth', block: 'center' }
	}
});
		
tour.addStep({
    title: 'Creating a Shepherd Tour',
	text: 'Creating a Shepherd tour is easy. too! Just create a "Tour" instance, and add as many steps as you want.',
	attachTo: {
		element: '.omar',
		on: 'bottom'
    },
	buttons: [
		{
		action() {
			return this.back();
		},
		classes: 'shepherd-button-secondary',
		text: 'Back'
		},
		{
			action() {
				return this.next();
			},
			text: 'Next'
		}
	],
	id: 'creating'
});
		
tour.start();}
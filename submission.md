# Submission Notes

These notes will be read by HubSpot developers. Drop us a line!

## Given more time, what would you have done differently?

- written tests!!

- separated logic out more thoughtfully. I don't like having all this heavy JS in one file generally, and prefer to separate my logic out. Doesn't seem like a good use of my limited time in this instance though.

- correctly handled singular/plural genre/s

- iterated on the JavaScript structure. You can tell that I started small and built up--the GENRES variable for example. I'm 100% sure that I'm breaking some conventions where I landed; just seemed like the wrong area to focus on.

- generally speaking, i thought more about user interaction than about data structure here. there are a lot of rooms for optimization.

- in the real world, i'd want to talk with product about how they want to handle images of different sizes, fallbacks (I see that sneaky failing image you put in there!), etc. so every "card" looked its best

## How did you deviate from the directions, if at all, and why?

- I did not include a search bar. It was a time issue.

- didn't update the picker to show the number of selections (1 GENRE, 2 YEARS, etc). Again, time.

- many many areas that are not quite to-spec visually--for example, the check boxes on the checkbox dropdown. It is a decent mockup, but not production-ready.

## Is there anything else you'd like to let us know?

- This feels maybe 90% of the way "done" to me, and 85% of the way to a "pull request" level. Example: what is going on with that "form" in the main page?? I added it to take advantage of the semantic "reset" button but really, either we should use the full force of forms or we shouldn't put that in there. A "PR-ready" effort would either be in or out on forms.

- I assumed all the data was good! that is some silly nonsense and not what i would do in a real-world scenario. (also I see that broken image)

- In a real-life situation, I would of course use real image assets for the quotation decoration, and I would spend a lot more time perfecting the placement and making sure it looks clean, attractive, and professional at a number of different breakpoints and devices.

- in a real-life scenario, i would probably use 3 breakpoints--mobile, tablet/small screen (2 columns per row), and large screen. I would also check experience in large screens more closely. I'd be more careful and exact about things like distances--the mobile experience is slightly off-center for the exercise, for example.

- efficiency issues with loading. If I were doing it again, I would use a framework from the beginning. That would allow me to use a framework with opinions on states, that only reloads necessary chunks of the content, for example.

- normally i would make this much DRYer. For example. years and genres do basically the same thing; would be easier/better to have "filter" methods and pass in the type (year vs. genre) instead of these repetitive "if" blocks.

- I only half-fixed the accessibility issue with the cards--resolved by adding code (tabindex=0 on cards), not by fixing the semantic mistake that led to the problem in the first place.
Hi there.

This project is built with Supabase and Next.js and hosted at https://www.theGratefulDev.xyz/log

I've been reading and wanting to check out Supabase for a while. I was asked to speak on a topic at React Denver so I chose to delve in and build something.

This app is a small CRUD app that I use weekly to note projects and impacts I've had in my day job as a SWE. 
The Project uses Next.js with a Supabase client calling the related tables using PostgREST end points. This was my first time that I have used PostgREST endpoints and I found them to be very easy to work with. Is it easier than writing a query?, It's pretty similar really. The main thing I found I liked aout them is the way they are integrated (and automatically generated) with the PG Database. Using direct calls, and having a verified user, allows for implementation of Row Level Security. I leveraged this to make it so that a logged in user may only see records they created. 
I also implemented Google's 0Auth for this project to save on remembering yet another password.

Feel free to sing up and have a look around. 

There is an initial landing page put in place as I had been flagged by Google as a spamming site when hosting straight to the login page. I'll create some more interesting content there in the near future.

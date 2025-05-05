const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  // Send JSON response with formatted friends data
  res.send(JSON.stringify({users}, null, 4));
});

// GET request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
    // Retrieve the email parameter from the request URL and send the corresponding friend's details
const email = req.params.email;
  res.send(friends[email])
});


// POST request: Add a new friend
router.post("/", function(req, res) {
    // Check if email is provided in the request body
    if (req.body.email) {
        // Create or update friend's details based on provided email
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName, // Added similarly for lastName
            "DOB": req.body.DOB, // Added similarly for DOB
        };
    }
    // Send response indicating user addition
    res.send("The friend" + (' ') + (req.body.firstName) + " Has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", function(req, res) {
    // Extract email parameter from request URL
    const email = req.params.email;
    let friend = friends[email];  // Retrieve friend object associated with email

    if (friend) {  // Check if friend exists
        let DOB = req.body.DOB;
        // Update DOB if provided in request body
        if (DOB) {
            friend["DOB"] = DOB;
        }

        /*
        Include similar code here for updating other attributes as needed
        */

         // Update fisrtName if provided in request body
        let firstName = req.body.firstName; 
        if (firstName) {
            friend["firstName"] = firstName;
        }
        
        // Update lastName if provided in request body
        let lastName = req.body.lastName; 
        if (lastName) {
            friend["lastName"] = lastName;
        }

        friends[email] = friend;  // Update friend details in 'friends' object
        res.send(`Friend with the email ${email} updated.`);
    } else {
        // Respond if friend with specified email is not found
        res.send("Unable to find friend!");
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
    // Extract the email parameter from the request URL
    const email = req.params.email;
    if (email) {
        // Delete friend from 'friends' object based on provided email
        delete friends[email];
    }
    // Send a success message as the response, indicating the user has been deleted
    res.send(`Friend with the email ${email} deleted.`);
});

module.exports=router;
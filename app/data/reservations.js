let reservations = [{
        name: "firstReservation",
        phoneNumber: "8139526965",
        email: "daverioverde@gmail.com",
        UniqueID: 1
    },
    {
        name: "secondReservation",
        phoneNumber: "6781239856",
        email: "localhost@google.com",
        UniqueID: 2
    },
    {
        name: "thirdReservation",
        phoneNumber: "4042341000",
        email: "localhost@facebook.com",
        UniqueID: 3
    }
];
// Note how we export the array. This makes it accessible to other files using require.
module.exports = reservations;
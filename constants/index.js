export const plans = [
    {
        _id: 1,
        name: "Basic Package",
        price: 9,
        credits: 30,
        isMostPop: false,
        inclusions: [
            {
                label: "20 Free Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
        ],
    },
    {
        _id: 2,
        name: "Pro Package",
        price: 40,
        credits: 120,
        isMostPop: true,
        inclusions: [
            {
                label: "120 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
        ],
    },
    {
        _id: 3,
        name: "Premium Package",
        price: 199,
        credits: 2000,
        isMostPop: false,
        inclusions: [
            {
                label: "2000 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
        ],
    },
];


export const freeCredits = 5;
export const creditFee = -1;
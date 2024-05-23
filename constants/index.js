export const plans = [
    {
        _id: 1,
        name: "Basic Package",
        price: 9,
        credits: 30,
        isMostPop: false,
        inclusions: [
            {
                label: "30 Free Credits",
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
        price: 19,
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
        price: 29,
        credits: 230,
        isMostPop: false,
        inclusions: [
            {
                label: "230 Credits",
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
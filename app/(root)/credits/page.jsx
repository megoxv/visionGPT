import Checkout from "@/components/checkout";
import { plans } from "@/constants";
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider } from "@nextui-org/react";

export default async function PricingPage() {
    return (
        <>
            <h1 className="text-3xl font-bold text-center">Pricing</h1>
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={plan.isMostPop ? "border-2 border-secondary sm:scale-110" : ""}>
                            <CardHeader>
                                <h6 className="font-medium">{plan.name}</h6>
                            </CardHeader>

                            <CardBody className="gap-3">
                                <Chip
                                    size="lg"
                                    variant="flat"
                                    color="secondary"
                                >
                                    {plan.credits}
                                </Chip>
                                <Divider className="my-2" />
                                <div className="text-3xl font-semibold">
                                    ${plan.price}
                                </div>
                                <ul className="p-1 space-y-3">
                                    {plan.inclusions.map((inclusion) => (
                                        <li
                                            key={plan.name + inclusion.label}
                                            className="flex items-center gap-4"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-secondary"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                                            <p className="p-16-regular">{inclusion.label}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardBody>

                            <CardFooter>
                                <Checkout
                                    plan={plan.name}
                                    amount={plan.price}
                                    credits={plan.credits}
                                    isMostPop={plan.isMostPop}
                                />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    );
}
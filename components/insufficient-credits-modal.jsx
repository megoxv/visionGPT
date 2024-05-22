"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const InsufficientCreditsModal = () => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <Modal defaultOpen>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div className="flex-between">
                                <p className="p-16-semibold text-dark-400">Insufficient Credits</p>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Image
                                src="/assets/images/stacked-coins.png"
                                alt="credit coins"
                                width={100}
                                height={80}
                                className="maxw"
                            />

                            <h4 className="text-2xl text-foreground">
                                Oops.... Looks like you&#39;ve run out of free credits!
                            </h4>

                            <p className="text-base text-content2-foreground py-3">
                                No worries, though - you can keep enjoying our services by grabbing
                                more credits.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                No, Cancel
                            </Button>
                            <Button color="secondary" onClick={() => router.push("/credits")}>
                                Yes, Proceed
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    );
};
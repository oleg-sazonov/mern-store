import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import * as React from "react";

export const Dialog = React.forwardRef(function Dialog(props, ref) {
    const {
        children,
        motionPreset = "scale",
        scrollBehavior = "inside",
        finalFocusRef,
        ...rest
    } = props;

    return (
        <ChakraDialog.Root
            scrollBehavior={scrollBehavior}
            motionPreset={motionPreset}
            finalFocusRef={finalFocusRef}
            {...rest}
        >
            {children}
        </ChakraDialog.Root>
    );
});

export const DialogTrigger = ChakraDialog.Trigger;
export const DialogCloseTrigger = ChakraDialog.CloseTrigger;

export const DialogContent = React.forwardRef(function DialogContent(
    props,
    ref
) {
    const { children, portalled = true, portalRef, ...rest } = props;

    return (
        <Portal disabled={!portalled} container={portalRef}>
            <ChakraDialog.Backdrop />
            <ChakraDialog.Positioner>
                <ChakraDialog.Content ref={ref} {...rest} asChild={false}>
                    {children}
                </ChakraDialog.Content>
            </ChakraDialog.Positioner>
        </Portal>
    );
});

export const DialogHeader = React.forwardRef(function DialogHeader(props, ref) {
    return <ChakraDialog.Header ref={ref} {...props} />;
});

export const DialogFooter = React.forwardRef(function DialogFooter(props, ref) {
    return <ChakraDialog.Footer ref={ref} {...props} />;
});

export const DialogBody = React.forwardRef(function DialogBody(props, ref) {
    return <ChakraDialog.Body ref={ref} {...props} />;
});

export const DialogTitle = ChakraDialog.Title;
export const DialogDescription = ChakraDialog.Description;

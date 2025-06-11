import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Text } from "~/components/ui/text";

type AlertDialogProps = {
    dialogStatusFlag: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export function AlertDialogScreen({
    dialogStatusFlag,
    onCancel,
    onConfirm,
}: AlertDialogProps) {
    // Handle dialog state changes
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Dialog is being closed, call onCancel to clean up state
            onCancel();
        }
    };

    return (
        <AlertDialog open={dialogStatusFlag} onOpenChange={handleOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this todo item from your list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onPress={onCancel}>
                        <Text>Cancel</Text>
                    </AlertDialogCancel>
                    <AlertDialogAction onPress={onConfirm}>
                        <Text>Continue</Text>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

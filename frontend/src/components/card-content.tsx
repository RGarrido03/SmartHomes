import {CardContent} from "@/components/ui/card";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {MaterialSymbol} from "react-material-symbols";

export function cardContent({ }: { text: string }) {
    return (
        <CardContent className="flex flex-1 flex-row items-center">
            <Link className={buttonVariants({variant: "outline"})} href="#">
                <MaterialSymbol icon="mode_fan" size={40}/>
                <p className="text-primary-foreground">
                    AC
                </p>
                <p className="text-primary-foreground">
                    420 W
                </p>
            </Link>
            <Link className={buttonVariants({variant: "outline"})} href="#">
                <br/>
                <MaterialSymbol icon="mode_fan" size={40}/>
                <p className="text-primary-foreground">
                    AC
                </p>
                <p className="text-primary-foreground">
                    420 W
                </p>
            </Link>
            <Link className={buttonVariants({variant: "outline"})} href="#">
                <br/>
                <MaterialSymbol icon="mode_fan" size={40}/>
                <p className="text-primary-foreground">
                    AC
                </p>
                <p className="text-primary-foreground">
                    420 W
                </p>
            </Link>
        </CardContent>
    );
}
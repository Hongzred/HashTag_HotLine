import React from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

const dumbyHashtags = ["#abc", "#cba", "#qwe"];
export default function Settings(props) {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 20,
                    padding: 20
                }}
            >
                <form style={{ width: "80%" }}>
                    <ChipInput
                        defaultValue={dumbyHashtags}
                        fullWidth
                        label="Hashtags"
                        placeholder="Type and press enter to add hashtags"
                    />
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="botMessage">
                            Bot Message
                        </InputLabel>
                        <Input id="botMessage" type="text" />
                    </FormControl>
                    <Button variant="contained" color="primary" size="medium">
                        Save
                    </Button>
                </form>
            </div>
        </>
    );
}

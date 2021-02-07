import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { Campaign } from "./campaign";
import campaignService from './campaign.service';
import { UserState } from "../store/store";
import { useSelector } from "react-redux";

type Name = {
    campaignname: string;
}

function AddCampaignComponent() {
    const nav = useNavigation();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const { register, handleSubmit, errors } = useForm<Name>();

    const onSubmit = handleSubmit((data) => {
        //create a campaign with the data entered and the user's username
        let newC = new Campaign();
        newC.campaignname = data.campaignname;
        if (user.id) {
            newC.dm = user.id;
        }
        campaignService.addCampaign(newC).then(() => {
            nav.navigate('Home');
        });
    })

    return (
        <View style={styles.container}>
            <form style={{width: 750, alignItems: 'center', alignContent:'center'}} onSubmit={onSubmit}>
                <label style={{ color: "#fb5b5a", fontFamily: "Calibri", fontSize:25, fontWeight:'bold'}}>Campaign Name:</label><br /><br />
                <input style={{
                    width: '80%',
                    backgroundColor: '#465881',
                    borderRadius: 25,
                    border: 'none',
                    height: 25,
                    marginBottom: 10,
                    justifyContent: 'center',
                    padding: 20,
                }} type="text" name='campaignName' ref={register({ required: true })} />
                {errors.campaignname && <div style={{ color: "red", fontFamily: "Calibri" }} className="error">Enter a campaign name.</div>}
                <button style={{
                    width: '50%',
                    backgroundColor: '#fb5b5a',
                    borderRadius: 25,
                    border: 'none',
                    height: 50,
                    alignItems: 'center',
                    alignSelf:'center',
                    justifyContent: 'center',
                    marginTop: 40,
                    marginBottom: 10,
                    color: 'white',
                    flex:1
                }} type="submit">Create</button>
            </form>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddCampaignComponent;
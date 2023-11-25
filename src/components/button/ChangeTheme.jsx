import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "antd";
import {
    FireOutlined,
    FireFilled
} from "@ant-design/icons";

const ChangeTheme = () => {
    const { themeColor, setThemeColor } = useTheme();

    const swtichTheme = () => {
        setThemeColor(!themeColor)
    }

    return (
        <Button
            type="text"
            shape="circle"
            icon={themeColor ? <FireOutlined /> : <FireFilled />}
            onClick={() => { swtichTheme() }}
        />
    )
}

export default ChangeTheme;
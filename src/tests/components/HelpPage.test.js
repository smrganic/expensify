import React from "react"
import { shallow } from "enzyme"
import HelpPage from "../../components/HelpPage"

test("Should render HelpPage.", () => {
    const wrapper = shallow(<HelpPage />)
    expect(wrapper).toMatchSnapshot()
})
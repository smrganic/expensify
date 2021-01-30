// The simplest possible tests to try out jest.

const add = (a, b) => a + b
const generateGreeting = (name = "Anonymous") => `Hello ${name}!`

test("Should add two numbers", () => {
    expect(add(3, 4)).toBe(7)
})

test("Should generate greeting with name.", () => {
    expect(generateGreeting("Mike")).toBe("Hello Mike!")
})

test("Should generate greeting for no name.", () => {
    expect(generateGreeting()).toBe("Hello Anonymous!")
})
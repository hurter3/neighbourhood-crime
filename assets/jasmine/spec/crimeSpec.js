describe("Updates the crime_outcome result", function() {
    // Specs are defined by calling the global Jasmine function it
    it("should exist", function() {
            // Expectations are built with the function expect which takes a value, called the actual.
            // Each matcher implements a boolean comparison between the actual value and the expected value.
            // Any matcher can evaluate to a negative assertion by chaining the call to expect with a not before calling the matcher.
            expect(updateOutcome).toBeDefined();
    });
        
    it("should return CLOSED from updateOutcome when the crimeId is ODD = updateOutcome(13)", function() {
        var result = updateOutcome(13)
        expect(result).toBe("closed");
    });
        
        
    it("should return UNDER INVESTIGATION from updateOutcome when the crimeId is EVEN = updateOutcome(22)", function() {
        var result = updateOutcome(22)
        expect(result).toBe("under investigation");
    });
    
   
        
   
});

describe('angularNumberConverter', function() {

  var numberConverterService;

  beforeEach(module("angularNumberConverter"));

  beforeEach(inject(function (_numberConverter_) {
    numberConverterService = _numberConverter_;
  }));

  describe('toRoman', function() {

    it('should convert correct positive numbers', function() {
      expect(numberConverterService.toRoman(1)).toBe('i');
      expect(numberConverterService.toRoman(1, true)).toBe('I');

      expect(numberConverterService.toRoman(890)).toBe('dcccxc');
      expect(numberConverterService.toRoman(890, true)).toBe('DCCCXC');
    });

    it('should do nothing if parameter is NaN', function() {
      expect(numberConverterService.toRoman('string')).toBe('string');
    });

  });

  describe('toLetter', function() {

    it('should convert correct positive numbers for num <= 26', function() {
      expect(numberConverterService.toLetter(1)).toBe('a');
      expect(numberConverterService.toLetter(1, true)).toBe('A');

      expect(numberConverterService.toLetter(26)).toBe('z');
      expect(numberConverterService.toLetter(26, true)).toBe('Z');
    });

    it('should convert correct positive numbers for num > 26', function() {
      expect(numberConverterService.toLetter(890)).toBe('ahf');
      expect(numberConverterService.toLetter(890, true)).toBe('AHF');
    });

    it('should do nothing if parameter is NaN', function() {
      expect(numberConverterService.toLetter('string')).toBe('string');
    });

  });

});

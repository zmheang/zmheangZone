The Number Type 

The Number type has exactly 18437736874454810627 (that is, 2 64 2 53 +3) values, representing the double-
precision 64-bit format IEEE 754-2008 values as specified in the IEEE Standard for Binary Floating-Point
Arithmetic, except that the 9007199254740990 (that is, 2 53 2) distinct “Not-a-Number” values of the IEEE
Standard are represented in ECMAScript as a single special NaN value. (Note that the NaN value is produced
by the program expression NaN.) In some implementations, external code might be able to detect a difference
between various Not-a-Number values, but such behaviour is implementation-dependent; to ECMAScript code,
all NaN values are indistinguishable from each other.



`The bit pattern that might be observed in an ArrayBuffer (see 24.1) after a Number value has been stored into it
is not necessarily the same as the internal representation of that Number value used by the ECMAScript
implementation.`



There are two other special values, called positive Infinity and negative Infinity. For brevity, these values are
also referred to for expository purposes by the symbols +  and   , respectively. (Note that these two infinite
Number values are produced by the program expressions +Infinity (or simply Infinity) and -Infinity.)



The other 18437736874454810624 (that is, 2 64 2 53 ) values are called the finite numbers. Half of these are positive
numbers and half are negative numbers; for every finite positive Number value there is a corresponding
negative value having the same magnitude.



Note that there is both a positive zero and a negative zero. For brevity, these values are also referred to for
expository purposes by the symbols +0 and  0, respectively. (Note that these two different zero Number values
are produced by the program expressions +0 (or simply 0) and -0.)



The 18437736874454810622 (that is, 2 64 2 53 2) finite nonzero values are of two kinds:
18428729675200069632 (that is, 2 64 2 54 ) of them are normalized, having the form
s  m  2 e
where s is +1 or 1, m is a positive integer less than 2 53 but not less than 2 52 , and e is an integer ranging from
1074 to 971, inclusive.
The remaining 9007199254740990 (that is, 2 53 2) values are denormalized, having the form
s  m  2 e
where s is +1 or 1, m is a positive integer less than 2 52 , and e is 1074.
Note that all the positive and negative integers whose magnitude is no greater than 2 53 are representable in the
Number type (indeed, the integer 0 has two representations, +0 and -0).



A finite number has an odd significand if it is nonzero and the integer m used to express it (in one of the two
forms shown above) is odd. Otherwise, it has an even significand.
In this specification, the phrase “the Number value for x” where x represents an exact nonzero real mathematical
quantity (which might even be an irrational number such as ) means a Number value chosen in the following
manner. Consider the set of all finite values of the Number type, with  0 removed and with two additional values
added to it that are not representable in the Number type, namely 2 1024 (which is +1  2 53  2 971 ) and 2 1024 (which
is 1  2 53  2 971 ). Choose the member of this set that is closest in value to x. If two values of the set are equally
close, then the one with an even significand is chosen; for this purpose, the two extra values 2 1024 and 2 1024 are
considered to have even significands. Finally, if 2 1024 was chosen, replace it with + ; if 2 1024 was chosen,
replace it with   ; if +0 was chosen, replace it with  0 if and only if x is less than zero; any other chosen value is
used unchanged. The result is the Number value for x. (This procedure corresponds exactly to the behaviour of
the IEEE 754-2008 “round to nearest, ties to even” mode.)
Some ECMAScript operators deal only with integers in specific ranges such as 2 31 through 2 31 1, inclusive, or
in the range 0 through 2 16 1, inclusive. These operators accept any value of the Number type but first convert
each such value to an integer value in the expected range. See the descriptions of the numeric conversion
operations in 7.1.

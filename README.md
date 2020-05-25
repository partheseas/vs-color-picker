# A color picker for VSCode that doesn't suck.

Because the rest of them do.

The built in color picker makes me sad because it lacks a bunch of features. It's
one of the only things that makes me miss using Atom as my text editor. The color
picker extension I used in Atom was _amazing_, but there are far too many positives
to justify going back, so here's me trying to fix the situation.

-   No ability to invoke it manually
    -   VSCode has to be aware of the context and _know_ that what you're dealing
        with is a color to get the color picker to show up.
    -   No ability to use the color picker in JavaScript/TypeScript/Rust or pretty
        much any file that isn't HTML, CSS, or SCSS (even Sass isn't supported)
    -   If you want to create a color, you have to type something like `#000000`
        first, then hover over it, and wait for the color picker to pop up
-   No ability to convert color formats
    -   I'm often given a color in `rgb(x, x, x)` format (or maybe even `hsl(x, x, x)`),
        and want to convert it to `#xxxxxx` quickly when using it. Currently, I
        have the options of doing the conversion in my head (if simple), using a
        script I wrote, being lazy and running `node` to do `xxx..toString(16)`,
        finding a conversion tool website that doesn't look like it will kill my
        computer or hack into my soul, or some other unideal situation.
-   Built in color picker is buggy
    -   If you mess around with hsl colors in it for any amount of time, it will
        eventually forget that the color is hsl and just randomly convert it to rgb
-   Only uses hsl color space (which, tbf, is a good color space)
    -   Being able to switch between color spaces can be really helpful sometimes
    -   Sometimes you even want different perspectives of the same color space

The unfortunate thing is that VSCode doesn't seem to provide enough API's for this
to really work, so....I'm gonna have to be creative. 🙃

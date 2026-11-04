---
title: "Reducing Execution Time with Parallel Processing in Octave"
date: 2022-07-23T20:37:34+09:00
draft: false
tags: [Octave, Parallel Processing, parallel]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1631893765/tech/tech-logos/Gnu-octave-logo_mpu4ln.svg"
---

## Conclusion

To use parallel processing in Octave and reduce execution time, use `pararrayfun` or `parcellfun` from the `parallel` package to replace processing inside nested `for` loops with parallel execution.

That's the short answer, but let me go into a bit more detail.

## The `parallel` Package for Parallel Processing

Octave provides the `parallel` package to enable parallel processing similar to other programming languages. If you're not familiar with parallel processing, [this article](https://qiita.com/4_mio_11/items/7f418ca661d9f5a2a39d) may be a good starting point.

The official manual page existed, but the manual is no longer available. It also covers basic usage of `pararrayfun()`, one of the key functions.

## Important Notes

There are a few things to watch out for. The main points are:

1. Errors during installation on Windows
2. Arguments and return values must have matching dimensions
3. Use `arrayfun` for debugging

Details below.

### Errors During Installation on Windows

When installing the package with `pkg install -forge parallel`, an error occurs on Windows with the default setup.

For details and a workaround, refer to the page below.
{{<blogcard url="https://octave.discourse.group/t/fail-of-parallel-4-0-1-installation-on-windows-10-home-and-octave-7-1-0/2533">}}

### Arguments and Return Values Must Have Matching Dimensions

Arguments and return values passed to `pararrayfun()` must have the same dimensions.

Using the example from the official page directly, in the program below, `vector_x` and `vector_y` are both 1×10 arrays with the same dimensions. The arguments and return values of `pararrayfun` (or `fun` in this case) must have matching dimensions.

```
pkg load parallel
fun = @(x) x.^2;
vector_x = 1:10;
vector_y = pararrayfun(nproc, fun, vector_x, "Vectorized", true, "ChunksPerProc", 1)
```

Now let's try writing a program where the argument (`vector_x`) is a 1×10 array but the return value (`vector_y`) is a 10×1 array:

```
pkg load parallel
fun = @(x) x.^2';
vector_x = 1:10;
vector_y = pararrayfun(nproc, fun, vector_x, "Vectorized", true, "ChunksPerProc", 1)
```

This produces the following error:

```
error: cat: dimension mismatch
error: called from
    chunk_parcellfun>@<anonymous> at line 55 column 33
    chunk_parcellfun at line 55 column 15
    pararrayfun at line 73 column 28
```

### Use `arrayfun` for Debugging

`pararrayfun` does not display detailed error information by default. You can view error details by setting the `ErrorHandler` argument, but I find it too cumbersome and don't use it. See the page below for information on `ErrorHandler`.

{{<blogcard url="https://octave.sourceforge.io/octave/function/arrayfun.html">}}

Instead, the quickest approach is to use `arrayfun`. The official manual is [here](https://octave.sourceforge.io/octave/function/arrayfun.html). `arrayfun` performs **non**-parallel computation on a given function and arguments, and properly reports detailed error messages.

## When to Use It (and When Not To)

As mentioned at the start, **it works well for speeding up most nested `for` loop operations**.

Conversely, the following cases are either impossible to implement or not suitable for parallelization:

- _When the arguments and return values of `pararrayfun` cannot be unified in dimension, or when complex processing is needed to do so_
- _When the overhead is too large_
- _When rewriting to use Octave's array-optimized operations would be faster_

The first point is obvious, but it's surprisingly common for this constraint to prevent parallelization. Forcing dimension unification can also severely reduce code readability, and the added processing may not reduce execution time as much as hoped.

For the second point, as explained in the pages below, large overhead can actually slow things down. A clear example: calling `pararrayfun` inside another `pararrayfun` for nested parallelism can result in slower execution. Overhead is partly dependent on machine power, but adjusting the `nproc` argument of `pararrayfun` may help (though this is just my guess)[^1].

{{<blogcard url="https://www.dogrow.net/octave/blog22/">}}
{{<blogcard url="https://docs.oracle.com/cd/E19205-01/820-1209/bjael/index.html">}}

For the third point, rather than naively parallelizing, converting the operation to Octave/MATLAB's array-based computations can be faster.

As an example, compare a slightly modified version of the parallel processing code from the official manual against a simple element-wise squaring of an array. Save the following as `hoge.m` and run it:

```
pkg load parallel

fun = @(x) x.^2;
vector_x = 1:10;

tic
vector_y = pararrayfun(nproc, fun, vector_x, "Vectorized", true, "ChunksPerProc", 1);
toc

tic
vector_y = fun(vector_x);
toc
```

On my PC, the result was as follows (consistently across multiple runs):

```
Elapsed time is 0.913133 seconds.
Elapsed time is 3.09944e-05 seconds.
```

This isn't a nested `for` loop scenario, so it's not fair to say "array operations are always better," but for this simple an operation, Octave's native array arithmetic is clearly much faster. (lol)

## Closing Thoughts

You need to be careful about where you use parallel processing and avoid sacrificing code readability, but when used appropriately, parallelization is an incredibly powerful tool for reducing execution time.

In practice, applying both parallelization and array-based operations to an Octave program I was using previously cut the execution time from 2 hours down to 20 minutes.

[^1]: I haven't actually tried this, so it's just speculation — but theoretically it should be possible. That said, this kind of tuning can take a lot of time, so I avoid writing nested parallel processing.

---
id: use-nullable-data
title: Use Nullable Data Types Whenever Required
sidebar_label: Use Nullable Data Types
sidebar_position: 3
---
## Use Nullable Data Types Whenever Required

Nullable data types are a special kind of value types that can hold either a valid value or a null value. Nullable data types are useful when you need to represent the absence or undefined state of a value, such as in a database or user input¹.

To declare a nullable data type, you can use the `?` operator after the value type name, such as `int?`, `bool?`, `DateTime?`, etc. Alternatively, you can use the generic `Nullable<T>` struct, where `T` is the value type, such as `Nullable<int>`, `Nullable<bool>`, `Nullable<DateTime>`, etc.

To assign a null value to a nullable data type, you can use the `null` keyword or the default value expression, such as `int? x = null;` or `int? x = default;`.

To access the value of a nullable data type, you can use the `Value` property or the null-coalescing operator (`??`), such as `int y = x.Value;` or `int y = x ?? 0;`.

To check if a nullable data type has a valid value or not, you can use the `HasValue` property or the null-conditional operator (`?.`), such as `if (x.HasValue) { ... }` or `if (x?.Value > 0) { ... }`.

For example, consider this class that represents a product:

```csharp
public class Product
{
    // A non-nullable property
    public string Name { get; set; }

    // A nullable property
    public decimal? Price { get; set; }

    // A constructor
    public Product(string name, decimal? price)
    {
        Name = name;
        Price = price;
    }

    // A method that prints the product details
    public void PrintDetails()
    {
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Price: {Price?.ToString("C") ?? "N/A"}");
    }
}
```

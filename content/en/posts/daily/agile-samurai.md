---
title: "Reading The Agile Samurai at Year's End"
date: 2025-11-23T08:21:11Z
draft: false
show_date: true
toc: true
tags: [Scrap, Essay, Agile Development, Agile Samurai]
categories: [Daily]
thumbnail: ""
---

I thought about putting this in the `Tech` category... but since it's enjoyable as a read, I put it in `Daily`.

I'm going to write this as a scrap since trying to summarize everything at once would take too long.

## 2025/11/23

For various reasons, I started reading the following book.

{{<amazon asin="4274068560" title="The Agile Samurai: How Agile Masters Deliver Great Software">}}

I've read through Chapter 2 for now.

### Chapter 1

An overview of agile development was covered.

> Managing expectations

That seems like something you could say about waterfall too.

### Chapter 2

I learned about the details of agile development. Keywords are:

- Self-organization
- Cross-functional teams
  - Generalists
  - Things to consider when looking for team members
- On-site customer / Product owner
- Authority

Areas where I had a shallow understanding of agile development are starting to become clearer as they get put into words.

In particular, the following passage helpfully explains something I had been fuzzy on:

> When building a team, it's better not to fit people to roles, but rather to decide the role assignments to fit the people  
> In agile projects... (abbreviated) ...everyone has to wear many different hats

At the same time, I started to see how common role assignments align — or don't — with my own personality and thinking style.

{{< table "table" >}}

| Role                   | Compatibility | Reason                                                                            |
| ---------------------- | ------------- | --------------------------------------------------------------------------------- |
| Analyst                | △             | Little experience, hard to imagine how to move                                    |
| Programmer             | ◎             | My product philosophy and past experience align best (well, obviously)            |
| Tester                 | 〇            | Not quite as much as programmer, but mostly aligned                               |
| PM                     | 〇            | Little experience, but my thinking is aligned                                     |
| UX Designer            | ×             | I can recognize bad UI, but I don't know what to actually do for UX improvement   |
| DB Admin               | 〇            | I have a rough idea, but almost no experience with DB tuning or heavy maintenance |
| Infrastructure Manager | ×             | Way too inexperienced                                                             |

{{</table>}}

That's how it looks for now. I'll keep reading a bit at a time from tomorrow onwards.

## 2025/11/25

I read up to the middle of Chapter 5.

### Chapter 3

I learned about the overview (the 10 questions) of the Inception Deck, their roles and importance.

### Chapter 4

I learned that at the start of a project, the following items should be done:

- Clarify why our team is here (question our reason for being)
  - Place yourself physically in the field
  - Grasp the commander's intent
    - Both help make clear decisions and understand the key points and strengths of the product
- Make a "what we're NOT doing" list
- Buy warm coffee and donuts for the neighbors

The last point is something that's hard to do unless the client and the development team are working physically close to each other. I understand the importance, but for fully remote or hybrid setups, it seems like you'd need to get creative.

### Chapter 5

I understood the importance of sharing risks, managing risks, and clarifying which risks the team will tackle together.

Among other things:

> Choosing a team is choosing an architecture... (abbreviated)  
> It's more important that the right members are in the project who will work in step with the proposed solution

...unexpectedly resonated with me. I hadn't thought about it before, but looking back, we often steered toward the safe side and solved problems using team members' areas of expertise. Also, team members who keep in step while engaging in dialogue and discussion throughout a project are truly valuable.

Chapter 5 also brought up the concept of:

> Problems that keep you up at night

I'm the type who doesn't let work worries follow me into my private life, so honestly I tend to think "it'll work out somehow" — but it makes sense that sharing worries and managing risks and expectations is effective, especially early in a project.

That's it for today.

## 2025/11/30

I read up to the middle of Chapter 7.

Chapters up through 6 seem to have covered most of the concepts needed for agile development. From Chapter 7 onwards it sounds like things get into more detailed explanations.

From Chapters 5–6, I learned:

- Creating INVEST (Independent, Negotiable, Valuable, Estimatable, Small, Testable) user stories
- Having a clear chain of command is important to avoid collisions between different people's directions that lead to large rework or readjustment
- You need to properly control the four pillars of QCDS (Quality, Cost, Delivery, Scope)
  - Time is fixed
    - And timeframes should be thought of in small chunks — anything over about 6 months and there's a good chance you'll lose control
  - Cost is also fixed
  - Quality is fixed at a high standard
  - Scope (the plan) is variable
- When gathering requirements, don't make documentation the goal
  - Documentation has its limits, and documentation is a last resort

Thinking about it in the context of today's development environment, it becomes clear that if you want to build a high-quality system while fitting in as much scope as possible within a fixed timeframe, AI is a great match.

That's it for today.

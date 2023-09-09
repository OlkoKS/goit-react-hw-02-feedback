import { Component } from "react";
import { Section } from "../Section/Section";
import { FeedbackOptions } from "../FeedbackOptions/FeedbackOptions";
import { Statistics } from "../Statistics/Statistics";
import { Notification } from "../Notification/Notification";

class Feedback extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    }

    collectStateKeys = () => {
        let stateKeys = Object.keys(this.state);
        return stateKeys;
    }

    onLeaveFeedback = (evt) => {
        let option = evt.target.textContent;
        this.setState((prevState) => ({ [option]: prevState[option] + 1 }));
    }

    countTotalFeedback = () => {
        let totalFeedback = Object.values(this.state).reduce((prevValue, number) => { return prevValue + number }, 0);
        return totalFeedback;
    }

    countPositiveFeedbackPercentage = () => {
        let positiveFeedbackPercentage = Math.round((this.state.good / (this.countTotalFeedback() || 1)) * 100);
        return positiveFeedbackPercentage;
    }

    render() {
        return (
            <div>
                <Section title="Please leave feedback">
                    < FeedbackOptions
                        options={this.collectStateKeys()}
                        onLeaveFeedback={this.onLeaveFeedback} />
                </Section>
                <Section title="Statistics">
                    {this.countTotalFeedback() ? (
                    <Statistics
                        good={this.state.good}
                        neutral={this.state.neutral}
                        bad={this.state.bad}
                        total={this.countTotalFeedback()}
                        positivePercentage={this.countPositiveFeedbackPercentage()} />
                    ) : (
                    <Notification message="There is no feedback" />
                    )}
                </Section>
            </div>
        )
    }
}

export default Feedback;

import React, { useState, useEffect } from 'react';

export default function planBody(customerinfo) {

    const plan = customerinfo.plan;
    if (plan) {

        if (plan.substring(10) === 'F') {
            const result = 'Fall ' + plan.substring(0, 9);
            return result;
        }
        else if (plan.substring(10) === 'W') {
            const result = 'Winter ' + plan.substring(0, 9);
            return result;
        }
        else if (plan.substring(10) === 'S') {
            const result = 'Spring ' + plan.substring(0, 9);
            return result;
        }
        else if (plan.substring(10) === 'F-W-S') {
            const result = 'School Year ' + plan.substring(0, 9);
            return result;
        }
    }
}
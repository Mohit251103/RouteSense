
function is_ignore_segment(segment: string): boolean {
    return segment.startsWith("ignore_");
}

function is_template_segment(segment: string): boolean {
    return segment.startsWith(":") || segment.startsWith("*") || segment.startsWith("?");
}

export const rules = {
    is_ignore_segment,
    is_template_segment
};